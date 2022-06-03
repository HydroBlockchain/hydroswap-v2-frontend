import { useCallback } from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import getGasPrice from 'utils/getGasPrice'
import { useSousChef, useKvsContract } from 'hooks/useContract'
import { DEFAULT_GAS_LIMIT } from 'config'
import BigNumber from 'bignumber.js'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const harvestPool = async (sousChefContract, amount) => {
  const gasPrice = getGasPrice()
  return sousChefContract.withdrawProfit(amount, { ...options, gasPrice })
}

const harvestPoolBnb = async (sousChefContract) => {
  const gasPrice = getGasPrice()
  return sousChefContract.deposit({ ...options, value: BIG_ZERO, gasPrice })
}

const useHarvestPool = ({sousId, isUsingBnb = false, pool}) => {
  const { userData} =pool
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const amount = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const sousChefContract = useKvsContract(sousId)
  

  const handleHarvest = useCallback(async () => {
    if (isUsingBnb) {
      return harvestPoolBnb(sousChefContract)
    }

    return harvestPool(sousChefContract, amount)
  }, [isUsingBnb, sousChefContract, amount])

  return { onReward: handleHarvest }
}

export default useHarvestPool
