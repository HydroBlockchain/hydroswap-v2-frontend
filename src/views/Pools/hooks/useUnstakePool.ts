import { useCallback } from 'react'
import { parseUnits } from '@ethersproject/units'
import { useSousChef, useKvsContract } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'

const sousUnstake = (sousChefContract: any, amount: string, decimals: number) => {
  const gasPrice = getGasPrice()

  return sousChefContract.withdrawFunds(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), {
    gasPrice,
  })
}

const sousEmergencyUnstake = (sousChefContract: any) => {
  const gasPrice = getGasPrice()
  return sousChefContract.emergencyWithdraw({ gasPrice })
}

const useUnstakePool = (sousId: number, enableEmergencyWithdraw = false) => {
  const sousChefContract = useKvsContract(sousId)

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
