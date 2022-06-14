import { Flex, TooltipText, useTooltip } from 'hydroswap-uikitv2'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { DeserializedPool } from 'state/types'
import BigNumber from 'bignumber.js'
import Apr from 'views/Pools/components/Apr'

const StyledTooltip = styled(TooltipText)`
font-weight:700;
font-size:24px;
text-decoration:none;
`

interface AprRowProps {
  pool: DeserializedPool
  stakedBalance: BigNumber
  performanceFee?: number
  showIcon?: boolean
}

const AprRow: React.FC<AprRowProps> = ({ pool, stakedBalance, performanceFee = 0, showIcon = true }) => {
  const { t } = useTranslation()
  const { vaultKey } = pool

  const tooltipContent = vaultKey
    ? t('APY includes compounding, APR doesn’t. This pool’s CAKE is compounded automatically, so we show APY.')
    : t('This pool’s rewards aren’t compounded automatically, so we show APR')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <StyledTooltip ref={targetRef}>{vaultKey ? `${t('APY')}:` : `${t('APR')}:`}</StyledTooltip>
      <Apr pool={pool} stakedBalance={stakedBalance} performanceFee={performanceFee} showIcon={showIcon} />
    </Flex>
  )
}

export default AprRow
