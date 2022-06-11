import { FooterLinkType } from 'hydroswap-uikitv2'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://t.me/projecthydro',
      },
      {
        label: t('Email'),
        href: 'mailto: team@projecthydro.org',
      },
      {
        label: t('Blog'),
        href: 'https://projecthydro.org/blog/',
      },
      {
        label: t('Keresverse'),
        href:'https://keresverse.org/',
      },
      {
        label: t('Project Hydro'),
        href: 'https://projecthydro.org/',
      }
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Troubleshooting'),
        href: 'https://projecthydro.org/faq/',
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
