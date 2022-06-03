import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Blog",
        href: "https://projecthydro.medium.com",
      },
      {
        label: "Community",
        href: "https://t.me/projecthydro",
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Help",
        href: "https://t.me/projecthydro",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/HydroBlockchain",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: "Twitter",
    href: "https://twitter.com/HydroBlockchain",
  },
  {
    label: "Telegram",
    icon: "Telegram",
    href: "https://t.me/projecthydro",
  },
  {
    label: "Reddit",
    icon: "Reddit",
    href: "https://www.reddit.com/r/projecthydro",
  },
  {
    label: "Instagram",
    icon: "Instagram",
    href: "https://www.instagram.com/hydroblockchain",
  },
  {
    label: "Github",
    icon: "Github",
    href: "https://github.com/HydroBlockchain",
  },
  {
    label: "Discord",
    icon: "Discord",
    href: "https://discord.gg/UTQQ54P",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
