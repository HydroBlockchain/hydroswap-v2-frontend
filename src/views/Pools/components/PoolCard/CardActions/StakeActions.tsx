import { Flex, Text, Button, IconButton, AddIcon, MinusIcon, useModal, Skeleton, useTooltip, useMatchBreakpoints } from 'hydroswap-uikitv2'
import {Token} from 'hydroswap-v2-sdk'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { DeserializedPool } from 'state/types'
import Balance from 'components/Balance'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
import StakeModal from '../Modals/StakeModal'
import useUserStakeInfo from "../../../hooks/useUserStakeInfo"
import CurrentTimer from "../../DateCountdown"
import AddStakeModal from '../Modals/AddStakeModal'
import CollectModal from '../Modals/CollectModal'




interface StakeActionsProps {
  pool: DeserializedPool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
  earningToken?: Token
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
  earningToken,
}) => {
  const { stakingToken, stakingTokenPrice, stakingLimit, isFinished, userData, sousId,  } = pool
  const {account} = useActiveWeb3React()
  const  {  isMobile } = useMatchBreakpoints()
  const {stakeInfo, loading, loaded, onRequest } = useUserStakeInfo(sousId, account)

  const { t } = useTranslation()
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)
    const requestedAmount = (+stakeInfo?.requestedAmount ?? 0 )
  const placeRequest =  (stakeInfo?.pending == false  && stakeInfo?.amount > 0) 

  const claimHydro = ((+stakeInfo?.requestedAmount ?? 0) > 0 && (stakeInfo?.releaseAt < stakeInfo?.currentTimeStamp) && stakeInfo?.pending )

  const [onPresentStake] = useModal(
    <StakeModal
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
      placeRequest={placeRequest}
      isRemovingStake={placeRequest}   
    />,
  )


  const [onClaimHydro] = useModal(
    <CollectModal
      formattedBalance={String(requestedAmount/10**18)}
      earningToken={earningToken}
      sousId={sousId}
      isBnbPool={isBnbPool}
      onRequest={onRequest}
      isClaiming
    />,
  )

  const [onAddStake] = useModal(
    <AddStakeModal
     isBnbPool={isBnbPool}
     pool={pool}
     stakingTokenBalance={stakingTokenBalance}
     stakingTokenPrice={stakingTokenPrice}
    />
  )

  

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('You’ve already staked the maximum amount you can stake in this pool!'),
    { placement: 'bottom' },
  )

  const reachStakingLimit = stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit)

  const placeRequestAction = (mobile = false)=>{
    return (<>
{(!loaded  && mobile) && 
              <StyledBtn
              mr='16px'
                disabled={loading}
              >
                {t(`Checking`)}
              </StyledBtn>
          }
           { mobile &&
             (placeRequest && loaded) &&    <StyledBtn 
             disabled={loading || stakeInfo?.pending }
             onClick={onPresentStake} mr="6px">
               {t(`${loading ? 'checking': stakeInfo?.pending ? 'Request Pending' : 'Place Unstake Request'}`)}
             </StyledBtn>
           }

           {/* {
            claimHydro &&  <StyledBtn 
            disabled={loading}
            onClick={onClaimHydro} mr="6px">
              {t(`Claim Hydro`)}
            </StyledBtn>
           } */}
    
    </>)
  }

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

          {
            placeRequestAction(!isMobile)
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
              onClick={stakingTokenBalance.gt(0) ? onAddStake : onPresentTokenRequired}
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
<Flex justifyContent='center' mt='16px'>
{placeRequestAction(isMobile)}
</Flex>
<div > 
  {
    (loaded &&  (stakeInfo?.pending && stakeInfo.requestedAmount > 0 && stakeInfo.releaseAt )  ) && <>
     <Flex justifyContent= {isMobile? 'center' : 'space-between'} alignItems='center' flexWrap='wrap-reverse'>
    <div style = {
      {
        width:isMobile ? '100%' : 'auto',
        
      }
    }>
    <Text mt='16px' fontSize='12px'>
    Stake Unlocks In
  </Text>
    <CurrentTimer targetDate={ new Date(stakeInfo?.releaseAt) } />
    </div>
    <div style={{   
      marginTop: '8px',
      width:isMobile ? '100%' : 'auto',
    }}>  
      <Text
      fontSize='12px'
       mb='0.5rem'>
    Amount to Unlock

      </Text>
      <StyledStakedHydro>
      {(+stakeInfo?.requestedAmount)/10**18} HYDRO
      </StyledStakedHydro>
    </div>
  </Flex>
  {/* <Button width='100%' onClick={onRequest}>Error Checking Staking Status, Try again</Button> */}
    </>
  }
    {
            claimHydro  &&  <StyledBtn 
            mt='1.5rem'
            width="100%"
            disabled={loading}
            onClick={onClaimHydro}>
              {t(`Claim Unstaked Hydro`)}
            </StyledBtn>
           }
 
    </div>
  </>

  }
  </Flex>
}

const StyledStakedHydro = styled.div`
font-weight: 700;
font-size: 1.25rem;
line-height: 1.75rem;
padding: 0.75rem 1.8rem;
text-align:center;
color:${({theme})=> theme.colors.btnColor};
border-radius:20px;
background:${({theme})=> theme.colors.btnBackground};
`
export default StakeAction
