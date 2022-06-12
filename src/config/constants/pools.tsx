/* eslint-disable */

import { BigNumber } from '@ethersproject/bignumber'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { CHAIN_ID } from './networks'
import tokens, { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')
console.log(CHAIN_ID, "chainid")

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    /**@ts-ignore */
    name: <Trans>Auto CAKE</Trans>,
     /**@ts-ignore */
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
     /**@ts-ignore */
    name: <Trans>Stake CAKE</Trans>,
     /**@ts-ignore */
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO CAKE',
     /**@ts-ignore */
    description: <Trans>Stake CAKE to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  },
} as const

const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.hydro,
    earningToken: serializedTokens.kvs,
    contractAddress: {
      97: '0x7ADc1A269B6Bfd20b9e32b7a7dd3980D7A92C301',
      56: '0x587DF4d33C83e0b13cA7F45f6BD1D99F0A402646',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 281,
    stakingToken: serializedTokens.hydro,
    earningToken: serializedTokens.kvs,
    contractAddress: {
      97: '0x7ADc1A269B6Bfd20b9e32b7a7dd3980D7A92C301',
      56: '0x587DF4d33C83e0b13cA7F45f6BD1D99F0A402646',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 999,
    tokenPerBlock: '63.136',
    version: 3,
  },
].filter((p) => !!p.contractAddress[CHAIN_ID])

export default pools
