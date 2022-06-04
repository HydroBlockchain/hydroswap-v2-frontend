import { request } from 'graphql-request';
/* eslint-disable no-console */
import poolsConfig from 'config/constants/pools'
import erc20ABI from 'config/abi/erc20.json'
import kvsStakingABI from 'config/abi/kvsStaking.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'
import uniq from 'lodash/uniq'
import { ethers } from 'ethers'
import { getBep20Contract } from '../../utils/contractHelpers'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol !== 'BNB')
const bnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol === 'BNB')
const nonMasterPools = poolsConfig.filter((pool) => pool.sousId !== 0)

export const fetchPoolsAllowance = async (account) => {
  const calls = nonBnbPools.map((pool) => ({
    address: pool.stakingToken.address,
    name: 'allowance',
    params: [account, getAddress(pool.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  console.log(allowances.toString(), 'allowances')

  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  const tokens = uniq(nonBnbPools.map((pool) => pool.stakingToken.address))
  const calls = tokens.map((token) => ({
    address: token,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  console.log(tokenBalancesRaw.toString(), 'tokenBalancesRaw')
  const tokenBalances = tokens.reduce((acc, token, index) => ({ ...acc, [token]: tokenBalancesRaw[index] }), {})
  const poolTokenBalances = nonBnbPools.reduce(
    (acc, pool) => ({
      ...acc,
      ...(tokenBalances[pool.stakingToken.address] && {
        [pool.sousId]: new BigNumber(tokenBalances[pool.stakingToken.address]).toJSON(),
      }),
    }),
    {},
  )

  // BNB pools
  const bnbBalance = await simpleRpcProvider.getBalance(account)

  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance.toString()).toJSON() }),
    {},
  )

  return { ...poolTokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonBnbPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'viewUser',
    params: [account],
  }))
  const userInfos = await multicall(kvsStakingABI, calls)
 
  return nonBnbPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfos[index][0]["amount"].toString()).toJSON(),
    }),
    {},
  )
  // return nonBnbPools.reduce(
  //   (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
  //   {},
  // )
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonBnbPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'checkCurrentRewards',
    params: [account],
  }))

  
  try {
    
    const result = await multicall(kvsStakingABI, calls)
    console.log(result, 'result <>', calls)
    // return nonBnbPools.reduce(
    //   (acc, pool, index) => ({
    //     ...acc,
    //     [pool.sousId]: new BigNumber(result[index].toString()).toJSON(),
    //   }),
    //   {},
    // )
  }
  catch (e) {
    console.log('multicall error', e)

   }
}
