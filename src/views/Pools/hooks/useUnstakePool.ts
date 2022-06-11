import { useCallback } from 'react'
import { parseUnits } from '@ethersproject/units'
import { useSousChef, useKvsContract } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'
import useUserStakeInfo from './useUserStakeInfo'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const sousUnstake = (sousChefContract: any, amount: string, decimals: number) => {
  const gasPrice = getGasPrice()

  return sousChefContract.withdrawFunds(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), {
    gasPrice,
  })
}


const useUnstakePool = (sousId: number, enableEmergencyWithdraw = false) => {
  const sousChefContract = useKvsContract(sousId)
  const {account} = useActiveWeb3React()
  const {onRequest} = useUserStakeInfo(sousId, account)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      
      // if (enableEmergencyWithdraw) {
      //   return sousEmergencyUnstake(sousChefContract)
      // }
      

      return sousUnstake(sousChefContract, amount, decimals)
    },
    [enableEmergencyWithdraw, sousChefContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
