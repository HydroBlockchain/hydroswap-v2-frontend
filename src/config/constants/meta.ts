import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Hydroswap',
  description:
    '',
  image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2698.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Hydroswap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Hydroswap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('Hydroswap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('Hydroswap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('Hydroswap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('Hydroswap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Hydroswap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Hydroswap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Hydroswap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Hydroswap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('Hydroswap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Hydroswap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Hydroswap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Hydroswap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Hydroswap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('Hydroswap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('Hydroswap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('Hydroswap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Hydroswap Info & Analytics')}`,
        description: 'View statistics for Hydroswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Hydroswap Info & Analytics')}`,
        description: 'View statistics for Hydroswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('Hydroswap Info & Analytics')}`,
        description: 'View statistics for Hydroswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('Hydroswap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('Hydroswap')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('Hydroswap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('Hydroswap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('Hydroswap')}`,
      }
    default:
      return null
  }
}
