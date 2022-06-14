import { useState } from 'react'
import {
  ButtonMenu,
  ButtonMenuItem,
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer,
  ModalHeader as UIKitModalHeader,
  ModalTitle,
} from 'hydroswap-uikitv2'
import { parseUnits } from '@ethersproject/units'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { FetchStatus } from 'config/constants/types'
import WalletInfo from './WalletInfo'
import WalletTransactions from './WalletTransactions'
import WalletWrongNetwork from './WalletWrongNetwork'


export enum WalletView {
  WALLET_INFO,
  TRANSACTIONS,
  WRONG_NETWORK,
}

interface WalletModalProps extends InjectedModalProps {
  initialView?: WalletView
}

export const LOW_BNB_BALANCE = parseUnits('2', 'gwei')

const ModalHeader = styled(UIKitModalHeader)`
  background: ${({ theme }) => theme.colors.gradients.cardHeader};
  /* background: ${({ theme }) => theme.colors.gradients.cardHeader}; */
`

const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`

const WalletModal: React.FC<WalletModalProps> = ({ initialView = WalletView.WALLET_INFO, onDismiss }) => {
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()
  const { balance, fetchStatus } = useGetBnbBalance()
  const hasLowBnbBalance = fetchStatus === FetchStatus.Fetched && balance.lte(LOW_BNB_BALANCE)

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  const ButtonMenuStyled = styled(ButtonMenu)`
  background-color: transparent;
  border: 0;
  `
  const ButtonMenuItemStyled = styled(ButtonMenuItem)`
  margin:0 0.5rem;
  background: ${({theme, isActive}) => {
    return isActive? theme?.colors?.btnBackground:theme?.colors?.backgroundAlt
  }};
  color: ${({theme, isActive}) => {
    return isActive? 'hsla(0, 0%, 91%, 1)':!theme?.isDark ? theme?.colors?.btnBackground:theme?.colors?.btnColor
  }};
  `
  const TabsComponent: React.FC = () => (
    <Tabs>
      <ButtonMenuStyled 
      scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
        <ButtonMenuItemStyled>{t('Wallet')}</ButtonMenuItemStyled>
        <ButtonMenuItemStyled>{t('Transactions')}</ButtonMenuItemStyled>
      </ButtonMenuStyled>
    </Tabs>
  )

  return (
    <ModalContainer title={t('Welcome!')} minWidth="320px">
      <ModalHeader>
        <ModalTitle>
          <Heading>{t('Your Wallet')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="text" />
        </IconButton>
      </ModalHeader>
      {view !== WalletView.WRONG_NETWORK && <TabsComponent />}
      <ModalBody p="24px" maxWidth="500px" width="100%">
        {view === WalletView.WALLET_INFO && <WalletInfo hasLowBnbBalance={hasLowBnbBalance} onDismiss={onDismiss} />}
        {view === WalletView.TRANSACTIONS && <WalletTransactions />}
        {view === WalletView.WRONG_NETWORK && <WalletWrongNetwork onDismiss={onDismiss} />}
      </ModalBody>
    </ModalContainer>
  )
}

export default WalletModal
