import { useCallback } from 'react'
import { parseUnits } from '@ethersproject/units'
import { useSousChef, useKvsContract } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'

const sousUnstake = (sousChefContract: any, amount: string, decimals: number) => {
  const gasPrice = getGasPrice()
  const amt = String(Math.round(+amount))
  const units = parseUnits(amount, decimals)
  console.log('kvs unstaking', amount, '1000000000000')

sousChefContract.viewUser('0xC0c96bb9Faba64D794EF9790EB0904597E6C6F60').then(d=>console.log(d,'data check'))
  return sousChefContract.withdrawFunds('10000000000300000000000000000000', {
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
      
      if (enableEmergencyWithdraw) {
        return sousEmergencyUnstake(sousChefContract)
      }

      return sousUnstake(sousChefContract, amount, decimals)
    },
    [enableEmergencyWithdraw, sousChefContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
