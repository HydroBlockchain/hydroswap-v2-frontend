import { useCallback } from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import getGasPrice from 'utils/getGasPrice'
import {  useKvsContract } from 'hooks/useContract'
import { DEFAULT_GAS_LIMIT } from 'config'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}


const claimInPool = async (sousChefContract) => {
  const gasPrice = getGasPrice()
  return sousChefContract.claimHydro( { ...options, gasPrice })
}


const useClaimHydro = (sousId) => {
  const sousChefContract = useKvsContract(sousId)

  const handleClaimHydro = useCallback(async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return claimInPool(sousChefContract)
  }, [sousChefContract])

  return { onClaimHydro: handleClaimHydro }
}

export default useClaimHydro
