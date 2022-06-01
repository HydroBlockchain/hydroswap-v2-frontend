import { CardProps } from 'hydroswap-uikitv2'
import { NftLocation, NftToken } from 'state/nftMarket/types'

export interface CollectibleCardProps extends CardProps {
  nft: NftToken
  nftLocation?: NftLocation
  currentAskPrice?: number
  isUserNft?: boolean
}
