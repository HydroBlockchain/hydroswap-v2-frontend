/* eslint-disable no-console */
import styled from 'styled-components'
import { Text, Flex, useModal, CalculateIcon, Skeleton, FlexProps, Button } from 'hydroswap-uikitv2'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { BalanceWithLoading } from 'components/Balance'
import { DeserializedPool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { vaultPoolConfig } from 'config/constants/pools'
import { useCurrentBlock } from 'state/block/hooks'
import { getPoolBlockInfo } from 'views/Pools/helpers'

const AprLabelContainer = styled(Flex)`
font-weight:700;
font-size:24px;
color:blue;
  &:hover {
    opacity: 0.5;
  }
`

const StyledBalance = styled(BalanceWithLoading)`
font-weight:700;
font-size:24px;
`
interface AprProps extends FlexProps {
  pool: DeserializedPool
  stakedBalance: BigNumber
  showIcon: boolean
  performanceFee?: number
  fontSize?: string
}

const Apr: React.FC<AprProps> = ({
  pool,
  showIcon,
  stakedBalance,
  fontSize = '16px',
  performanceFee = 0,
  ...props
}) => {
  const {
    apy,
    stakingToken,
    earningToken,
    isFinished,
    earningTokenPrice,
    stakingTokenPrice,
    userData,
    rawApr,
    vaultKey,
  } = pool
  const { t } = useTranslation()
  const currentBlock = useCurrentBlock()

  const { shouldShowBlockCountdown, hasPoolStarted } = getPoolBlockInfo(pool, currentBlock)

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  const apyModalLink = stakingToken.address ? `/swap?outputCurrency=${stakingToken.address}` : '/swap'

  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      earningTokenPrice={earningTokenPrice}
      stakingTokenPrice={stakingTokenPrice}
      stakingTokenBalance={stakedBalance.plus(stakingTokenBalance)}
      apr={vaultKey ? rawApr : apy}
      stakingTokenSymbol={stakingToken.symbol}
      linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
      linkHref={apyModalLink}
      earningTokenSymbol={earningToken.symbol}
      autoCompoundFrequency={vaultPoolConfig[vaultKey]?.autoCompoundFrequency ?? 0}
      performanceFee={performanceFee}
    />,
  )

  const openRoiModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onPresentApyModal()
  }

  const isValidate = apy !== undefined && !Number.isNaN(apy)
  return (
    <AprLabelContainer alignItems="center" justifyContent="flex-start" {...props}>
      {isValidate || isFinished ? (
        <>
          {hasPoolStarted || !shouldShowBlockCountdown ? (
            <>
              <StyledBalance
                fontSize={fontSize}
                isDisabled={isFinished}
                value={apy/10 ** 6}
                decimals={2}
                unit="%"
              />
              {!isFinished && showIcon && (
                // <Button onClick={openRoiModal} variant="text" width="20px" height="20px" padding="0px" marginLeft="4px">
                //  <CalculateIcon color="textSubtle" width="20px" />
                // </Button>
                <div />
              )}
            </>
          ) : (
            <Text>-</Text>
          )}
        </>
      ) : (
        <Skeleton width="80px" height="16px" />
      )}
    </AprLabelContainer>
  )
}

export default Apr
