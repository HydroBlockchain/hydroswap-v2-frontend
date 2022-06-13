import { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { getAddress } from 'utils/addressHelpers'
import { Flex, CardFooter, ExpandableLabel, HelpIcon, useTooltip, LinkExternal, Button, Text, MetamaskIcon} from 'hydroswap-uikitv2'
import { DeserializedPool } from 'state/types'
import { CompoundingPoolTag, ManualPoolTag } from 'components/Tags'
import { BASE_BSC_SCAN_URL } from 'config'
import { getBscScanLink } from 'utils'
import { registerToken } from 'utils/wallet'
import PoolStatsInfo from '../../PoolStatsInfo'

interface FooterProps {
  pool: DeserializedPool
  account: string
  totalCakeInVault?: BigNumber
  defaultExpanded?: boolean
}

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  button {
    padding: 0;
  }
`
const ExpandedWrapper = styled(Flex)`
  svg {
    height: 14px;
    width: 14px;
  }
`

const Footer: React.FC<FooterProps> = ({ pool, account, defaultExpanded, children }) => {
  const { vaultKey, contractAddress, earningToken} = pool
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || false)

  const manualTooltipText = t('You must harvest and compound your earnings from this pool manually.')
  const autoTooltipText = t(
    'Rewards are distributed and included into your staking balance automatically. There’s no need to manually compound your rewards.',
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(vaultKey ? autoTooltipText : manualTooltipText, {
    placement: 'bottom',
  })
  const tokenAddress = earningToken.address || ''
  const poolContractAddress = getAddress(contractAddress)
  const isMetaMaskInScope = !!window.ethereum?.isMetaMask

  return (
    <CardFooter>
      <Flex justifyContent="space-evenly" flexWrap="wrap">
       <Flex mb="4px">
          <LinkExternal href={`${BASE_BSC_SCAN_URL}/token/0x804d51B4751eec021fef2199936FAFde0A520e04`} small>
            {t('See Token Info')}
          </LinkExternal>
        </Flex>
        {!vaultKey && (
        <Flex mb="4px">
          <LinkExternal href={`https://keresverse.org`} bold={false} small>
            {t('View Project Site')}
          </LinkExternal>
        </Flex>
      )}
      {poolContractAddress && (
        <Flex mb="4px">
          <LinkExternal
            href={`${BASE_BSC_SCAN_URL}/address/${poolContractAddress}`}
            bold={false}
            small
          >
            {t('View Contract')}
          </LinkExternal>
        </Flex>
      )}
       {account && isMetaMaskInScope && tokenAddress && (
        <Flex mb="4px">
          <Button
            variant="text"
            p="0"
            height="auto"
            onClick={() =>
              registerToken(
                tokenAddress,
                earningToken.symbol,
                earningToken.decimals,
                `https://www.hydroswap.org/images/${tokenAddress}.png`,
              )
            }
          >
            <Text color="primary" fontSize="14px">
              {t('Add to Metamask')}
            </Text>
            <MetamaskIcon ml="4px" />
          </Button>
        </Flex>
      )}
      </Flex>
      {/* <ExpandableButtonWrapper>
        <Flex alignItems="center">
          {vaultKey ? <CompoundingPoolTag /> : <ManualPoolTag />}
          {tooltipVisible && tooltip}
          <Flex ref={targetRef}>
            <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
          </Flex>
        </Flex>
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? t('Hide') : t('Details')}
        </ExpandableLabel>
      </ExpandableButtonWrapper>
      {isExpanded && (
        <ExpandedWrapper flexDirection="column">
          {children || <PoolStatsInfo pool={pool} account={account} />}
        </ExpandedWrapper>
      )} */}
    </CardFooter>
  )
}

export default Footer
