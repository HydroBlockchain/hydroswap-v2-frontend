import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import {
  Modal,
  Text,
  Flex,
  Image,
  Button,
  Slider,
  BalanceInput,
  AutoRenewIcon,
  Link,
  CalculateIcon,
  IconButton,
  Skeleton,
} from 'hydroswap-uikitv2'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import BigNumber from 'bignumber.js'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { ToastDescriptionWithTx } from 'components/Toast'
import { getFullDisplayBalance, formatNumber, getDecimalAmount } from 'utils/formatBalance'
import { DeserializedPool } from 'state/types'
import { updateUserBalance, updateUserPendingReward, updateUserStakedBalance } from 'state/pools'
import { useAppDispatch } from 'state'
import { getInterestBreakdown } from 'utils/compoundApyHelpers'
import PercentageButton from './PercentageButton'
import useStakePool from '../../../hooks/useStakePool'
import useUnstakePool from '../../../hooks/useUnstakePool'
import useUserStakeInfo from '../../../hooks/useUserStakeInfo'

interface StakeModalProps {
  isBnbPool: boolean
  pool: DeserializedPool
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  isRemovingStake?: boolean
  onDismiss?: () => void
  placeRequest?:boolean
  claimHydro?:boolean
}

const StyledLink = styled(Link)`
  width: 100%;
`

const AnnualRoiContainer = styled(Flex)`
  cursor: pointer;
`

const AnnualRoiDisplay = styled(Text)`
  width: 72px;
  max-width: 72px;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
`


const AddStakeModal: React.FC<StakeModalProps> = ({
    isBnbPool,
    pool,
    stakingTokenBalance,
    stakingTokenPrice,
    onDismiss
  }) => {
    const { sousId, stakingToken, earningTokenPrice, apr, userData, stakingLimit, earningToken } = pool
    const { account } = useWeb3React()
    const { t } = useTranslation()
    const { theme } = useTheme()
    const dispatch = useAppDispatch()
    const { onStake } = useStakePool(sousId, isBnbPool)
    const { toastSuccess } = useToast()
    const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
    const [stakeAmount, setStakeAmount] = useState('')
    const [percent, setPercent] = useState(0)
    const usdValueStaked = new BigNumber(stakeAmount).times(stakingTokenPrice)
    const formattedUsdValueStaked = !usdValueStaked.isNaN() && formatNumber(usdValueStaked.toNumber())
    const getCalculatedStakingLimit = () => {
      return stakingLimit.gt(0) && stakingTokenBalance.gt(stakingLimit) ? stakingLimit : stakingTokenBalance
    }
    const fullDecimalStakeAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingToken.decimals)
    const userNotEnoughToken = userData.stakingTokenBalance.lt(fullDecimalStakeAmount)
  
    const handleStakeInputChange = (input: string) => {
      if (input) {
        const convertedInput = getDecimalAmount(new BigNumber(input), stakingToken.decimals)
        const percentage = Math.floor(convertedInput.dividedBy(getCalculatedStakingLimit()).multipliedBy(100).toNumber())
        setPercent(Math.min(percentage, 100))
      } else {
        setPercent(0)
      }
      setStakeAmount(input)
    }
  
    const handleChangePercent = (sliderPercent: number) => {
      if (sliderPercent > 0) {
        const percentageOfStakingMax = getCalculatedStakingLimit().dividedBy(100).multipliedBy(sliderPercent)
        const amountToStake = getFullDisplayBalance(percentageOfStakingMax, stakingToken.decimals, stakingToken.decimals)
        setStakeAmount(amountToStake)
      } else {
        setStakeAmount('')
      }
      setPercent(sliderPercent)
    }
  
    const handleConfirmClick = async () => {
      const receipt = await fetchWithCatchTxError(() => {
        return onStake(stakeAmount, stakingToken.decimals)
      })
      if (receipt?.status) {
          toastSuccess(
            `${t('Staked')}!`,
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('Your %symbol% funds have been staked in the pool!', {
                symbol: stakingToken.symbol,
              })}
            </ToastDescriptionWithTx>,
          )
  
        dispatch(updateUserStakedBalance({ sousId, account }))
        dispatch(updateUserPendingReward({ sousId, account }))
        dispatch(updateUserBalance({ sousId, account }))
        onDismiss?.()
      }
    }
  
    return (
      <Modal
        minWidth="346px"
        title={t('Stake in Pool')}
        onDismiss={onDismiss}
        headerBackground={theme.colors.gradients.cardHeader}
      >
        <Flex alignItems="center" justifyContent="space-between" mb="8px">
          <Text bold>{ t('Stake')}</Text>
          <Flex alignItems="center" minWidth="70px">
           
            <Text ml="auto" color="textSubtle" fontSize="12px" mb="6px">
              {t('Balance: %balance%', {
                balance: getFullDisplayBalance(getCalculatedStakingLimit(), stakingToken.decimals),
              })}
            </Text>
          </Flex>
        </Flex>
        <BalanceInput
          value={stakeAmount}
          onUserInput={handleStakeInputChange}
          currencyValue={stakingTokenPrice !== 0 && `~${formattedUsdValueStaked || 0} USD`}
          isWarning={userNotEnoughToken}
          decimals={stakingToken.decimals}
        />
        {userNotEnoughToken && (
          <Text color="failure" fontSize="12px" style={{ textAlign: 'right' }} mt="4px">
            {t('Insufficient %symbol% balance', {
              symbol: stakingToken.symbol,
            })}
          </Text>
        )}
        <Slider
          min={0}
          max={100}
          value={percent}
          onValueChanged={handleChangePercent}
          name="stake"
          valueLabel={`${percent}%`}
          step={1}
        />
        <Flex alignItems="center" justifyContent="space-between" mt="8px">
          <PercentageButton onClick={() => handleChangePercent(25)}>25%</PercentageButton>
          <PercentageButton onClick={() => handleChangePercent(50)}>50%</PercentageButton>
          <PercentageButton onClick={() => handleChangePercent(75)}>75%</PercentageButton>
          <PercentageButton onClick={() => handleChangePercent(100)}>{t('Max')}</PercentageButton>
        </Flex>
       
       <Flex justifyContent='center' alignItems='center' >
        <Button
            isLoading={pendingTx}
            endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
            onClick={handleConfirmClick}
            disabled={!stakeAmount || parseFloat(stakeAmount) === 0  || userNotEnoughToken}
            mt="24px"
             mr="24px"
            width='100%'
          >
            {pendingTx ? t('Confirming') : t('Confirm')}
          </Button>
       </Flex>
      </Modal>
    )
  }

  export default AddStakeModal