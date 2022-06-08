import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Skeleton, Text } from 'hydroswap-uikitv2'
import { useWeb3React } from '@web3-react/core'
import tokens from 'config/constants/tokens'
import { FetchStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import useAuth from 'hooks/useAuth'
import useTokenBalance, { useGetBnbBalance } from 'hooks/useTokenBalance'
import styled, {useTheme} from 'styled-components'


import { getBscScanLink } from 'utils'
import { formatBigNumber, getFullDisplayBalance } from 'utils/formatBalance'
import CopyAddress from './CopyAddress'

interface WalletInfoProps {
  hasLowBnbBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const LinkExternalStyled = styled(LinkExternal)`
  color: ${({theme}) => theme.colors.btnColor};
`
const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowBnbBalance, onDismiss }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { balance: cakeBalance, fetchStatus: cakeFetchStatus } = useTokenBalance(tokens.cake.address)
  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss?.()
    logout()
  }

  return (
    <>
      <Text color="secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb="24px" />
      {hasLowBnbBalance && (
        <Message variant="warning" mb="24px">
          <Box>
            <Text fontWeight="bold">{t('BNB Balance Low')}</Text>
            <Text as="p">{t('You need BNB for transaction fees.')}</Text>
          </Box>
        </Message>
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="textSubtle">{t('BNB Balance')}</Text>
        {fetchStatus !== FetchStatus.Fetched ? (
          <Skeleton height="22px" width="60px" />
        ) : (
          <Text>{formatBigNumber(balance, 6)}</Text>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text color="textSubtle">{t('Hydro Balance')}</Text>
        {cakeFetchStatus !== FetchStatus.Fetched ? (
          <Skeleton height="22px" width="60px" />
        ) : (
          <Text>{getFullDisplayBalance(cakeBalance, 18, 3)}</Text>
        )}
      </Flex>

      <Flex >
      <Box width={'50%'} >
      <Button 
       width="100%" onClick={handleLogout}  mr='0.5rem'
        >
        {t('Disconnect')}
      </Button>
      </Box>
      <Box width={'50%'} >
      <Button 
      width="100%" onClick={handleLogout} ml='0.5rem' style={{
        whiteSpace: 'nowrap',
        minWidth: 'auto',
      }}>
        <LinkExternalStyled 
        color={theme.colors.btnColor}
        href={getBscScanLink(account, 'address')}>{t('View on BscScan')}</LinkExternalStyled>
      </Button>
      </Box>
      </Flex>
    </>
  )
}

export default WalletInfo
