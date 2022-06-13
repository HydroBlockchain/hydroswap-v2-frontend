import { useCallback } from 'react'
import { useKvsContract } from 'hooks/useContract'
import {useEffect, useState} from 'react'


const useUserStakeInfo = (sousId,  account) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [stakeInfo, setStakeInfo] = useState(null)
  const sousChefContract = useKvsContract(sousId)

  const handleRequest = useCallback(async () => {
    setError(false)
    // setLoading(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks
 
     try {
         const info  = await sousChefContract.viewUser(account)
         const stakeData = {
             fullInfo: info,
             amount:+info[0]?.toString() ?? 0,
             releasedDate:+info?.[1].toString()*1000   +  (7 * 24 * 60 * 60 * 1000) ,
             currentTimeStamp:new Date().getTime(),
             pending:info?.['requests']?.['pending'] ?? false,
             releaseAt:(+info?.['requests']?.['releaseAt'].toString() *1000) ?? 0,
             requestedAmount:info?.['requests']?.['amount'].toString() ?? 0,
         }
         setStakeInfo(stakeData)
         if(!loaded) {
          setLoaded(true)
        }
     }
     catch(e){  
        setError(true)
     }
     setLoading(false)
  
  }, [sousChefContract, account])

  const interval = setInterval(() => {
    handleRequest()
  }, 30000);
  useEffect(() => {
    
    if (loaded && error) {
      interval
    } else {
      handleRequest()
    }

    return () => clearInterval(interval);

},[handleRequest])

  return { onRequest:handleRequest, loading, error, stakeInfo, loaded }
}

export default useUserStakeInfo
