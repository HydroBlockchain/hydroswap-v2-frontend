import { useCallback } from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import getGasPrice from 'utils/getGasPrice'
import { useSousChef, useKvsContract } from 'hooks/useContract'
import { DEFAULT_GAS_LIMIT } from 'config'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const useBunnyFactory = () => {
  const { library, account } = useActiveWeb3React()
  return account
}

const harvestPool = async (sousChefContract, amount) => {
  const gasPrice = getGasPrice()
  return sousChefContract.withdrawProfit(amount, { ...options, gasPrice })
}

const harvestPoolBnb = async (sousChefContract) => {
  const gasPrice = getGasPrice()
  return sousChefContract.deposit({ ...options, value: BIG_ZERO, gasPrice })
}

const useHarvestPool = (sousId, isUsingBnb = false, account) => {
  const sousChefContract = useKvsContract(sousId)

  const handleHarvest = useCallback(async () => {
    if (isUsingBnb) {
      return harvestPoolBnb(sousChefContract)
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const reward = await sousChefContract.checkCurrentRewards(account)

    return harvestPool(sousChefContract, reward)
  }, [isUsingBnb, sousChefContract, account])

  return { onReward: handleHarvest }
}

export default useHarvestPool
