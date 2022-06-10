import { FooterLinkType } from 'hydroswap-uikitv2'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://twitter.com/HydroBlockchain',
      },
      {
        label: t('Blog'),
        href: 'https://projecthydro.org/blog/',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Troubleshooting'),
        href: 'https://projecthydro.org/faq/',
      },
      {
        label: t('Guides'),
        href: '#',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/HydroBlockchain',
      },
    ],
  },
]
