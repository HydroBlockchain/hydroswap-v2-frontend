import { Flex, Text, Button, IconButton, AddIcon, MinusIcon, useModal, Skeleton, useTooltip } from 'hydroswap-uikitv2'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { DeserializedPool } from 'state/types'
import Balance from 'components/Balance'
import styled from 'styled-components'
import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
import StakeModal from '../Modals/StakeModal'
import useToast from 'hooks/useToast'
import useUserStakeInfo from "../../../hooks/useUserStakeInfo"
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import CurrentTimer from "../../DateCountdown"


interface StakeActionsProps {
  pool: DeserializedPool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
}

const StyledBtn = styled(Button)`
background-color: ${props => props.theme.colors.btnBackground};
color: ${props => props.theme.colors.btnColor};
`

const StakeAction: React.FC<StakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  stakedBalance,
  isBnbPool,
  isStaked,
  isLoading = true,
}) => {
  const { stakingToken, stakingTokenPrice, stakingLimit, isFinished, userData, sousId,  } = pool
  const {account} = useActiveWeb3React()
  const {stakeInfo, error, loading, onRequest} = useUserStakeInfo(sousId, account)
 
  const { t } = useTranslation()
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const placeRequest =  (stakeInfo?.pending ==false  && stakeInfo?.amount > 0) 

  const claimHydro = (stakeInfo?.requestedAmount > 0 && (stakeInfo?.releasedAt < stakeInfo?.currentTimeStamp) && stakeInfo?.pending )
  const [onPresentStake] = useModal(
    <StakeModal
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
      placeRequest={placeRequest}
      claimHydro={claimHydro}
      isRemovingStake={placeRequest}
      
    />,
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('You’ve already staked the maximum amount you can stake in this pool!'),
    { placement: 'bottom' },
  )

  const reachStakingLimit = stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit)

  const renderStakeAction = () => {
    return isStaked ? (
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column">
          <>
            <Balance bold fontSize="20px" decimals={3} value={stakedTokenBalance} />
            {stakingTokenPrice !== 0 && (
              <Text fontSize="12px" color="textSubtle">
                <Balance
                  fontSize="12px"
                  color="textSubtle"
                  decimals={2}
                  value={stakedTokenDollarBalance}
                  prefix="~"
                  unit=" USD"
                />
              </Text>
            )}
          </>
        </Flex>
        <Flex>

          {loading &&
              <StyledBtn
              mr='16px'
                disabled={loading}
              >
                {/* <AddIcon color="primary" width="24px" height="24px" /> */}
                {t(`Checking`)}
              </StyledBtn>
          }
           {
             placeRequest &&    <StyledBtn 
             disabled={loading || stakeInfo?.pending}
             onClick={onPresentStake} mr="6px">
               {t(`${loading ? 'checking': stakeInfo?.pending ? 'Request Pending' : 'Place Unstake Request'}`)}
             </StyledBtn>
           }
        

           {
            claimHydro &&  <StyledBtn 
            disabled={loading || stakeInfo?.pending}
            onClick={onPresentStake} mr="6px">
              {t(`Claim Hydro`)}
            </StyledBtn>
           }
         
          {reachStakingLimit ? (
            <span ref={targetRef}>
              <IconButton variant="secondary" disabled>
                <AddIcon color="textDisabled" width="24px" height="24px" />
              </IconButton>
            </span>
          ) : (
            <>
            <StyledBtn
              onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
              disabled={isFinished}
            >
              {/* <AddIcon color="primary" width="24px" height="24px" /> */}
              {t(`Add`)}
            </StyledBtn>
            </>
          )}
        </Flex>
        {tooltipVisible && tooltip}
      </Flex>
    ) : (
      <StyledBtn disabled={isFinished} onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>
        {t('Stake')}
      </StyledBtn>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="52px" /> : 
  <>
{renderStakeAction()}
<div > 
  {
    (!loading &&  (stakeInfo?.pending && stakeInfo.requestedAmount > 0 && stakeInfo.releaseAt )  ) && <>
     <Text mt='16px'>
    Time Before Unstaking
    <CurrentTimer targetDate={ new Date(stakeInfo.releaseAt) } />
    Amount to Claim:  {(+stakeInfo?.requestedAmount)/10**18} Hydro
  </Text>

  {/* <Button width='100%' onClick={onRequest}>Error Checking Staking Status, Try again</Button> */}
    </>
  }
    </div>
  </>
  }</Flex>
}

export default StakeAction
