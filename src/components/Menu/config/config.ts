import {
  MenuItemsType,
} from 'hydroswap-uikitv2'
import { ContextApi } from 'contexts/Localization/types'
// import { DropdownMenuItems } from 'hydroswap-uikitv2/src/components/DropdownMenu/types'

// export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean } & {
  items?: any[]
  // items?: ConfigMenuDropDownItemsType[]
}

const config: (t: ContextApi['t'], languageCode?: string) => ConfigMenuItemsType[] = (t, languageCode) => [
  {
    label: t('Swap'),
    href: '/swap',
    showItemsOnMobile: false,
    // items: [
    //   {
    //     label: t('Swap'),
    //     href: '/swap',
    //   },
    //   {
    //     label: t('Liquidity'),
    //     href: '/liquidity',
    //   },
    // ],
  },
  {
    label: t('Stake'),
    href: '/pools',
  },
  {
    label: t('Bridge'),
    href: '/bridge',
  },

]

export default config
