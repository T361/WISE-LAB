import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LinktreeIcon,
  TiktokIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/BrandIcons'

export interface SocialLink {
  label: string
  href: string
  Icon: typeof LinkedinIcon
}

/** Single source of truth for WISE Lab's real social profiles. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/wiselabpk',
    Icon: LinkedinIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/wiselabpk',
    Icon: InstagramIcon,
  },
  {
    label: 'X',
    href: 'https://x.com/wiselabpk',
    Icon: XIcon,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/wiselabpk',
    Icon: FacebookIcon,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@wiselabpk',
    Icon: YoutubeIcon,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@wiselabpk',
    Icon: TiktokIcon,
  },
  {
    label: 'Linktree',
    href: 'https://linktr.ee/wiselabpk',
    Icon: LinktreeIcon,
  },
]
