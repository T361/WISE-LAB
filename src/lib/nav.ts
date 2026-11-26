export const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'programs', label: 'Programs', href: null },
  // { id: 'testimonials', label: 'Founder Stories' },
  { id: 'our-partners', label: 'Our Partners', href: '/our-partners' },
  { id: 'happenings', label: 'Happenings', href: null },
  { id: 'about-us', label: 'About Us', href: null },
  // { id: 'wise-reports', label: 'WISE Reports' },
] as const

/** Sub-items shown in the Programs dropdown / mobile accordion */
export const PROGRAMS_DROPDOWN = [
  {
    href: '/incubation',
    label: 'Incubation',
  },
  {
    href: '/micro-entrepreneurship',
    label: 'Micro-Entrepreneurship',
  },
] as const

/** Sub-items shown in the About Us dropdown / mobile accordion */
export const ABOUT_US_DROPDOWN = [
  {
    href: '/behind-the-wings',
    label: 'Behind the Wings',
  },
  {
    href: '/become-a-mentor',
    label: 'Become a Mentor',
  },
  {
    href: '/connect',
    label: 'Connect',
  },
  {
    href: '/faqs',
    label: 'FAQs',
  },
] as const

/** Sub-items shown in the Happenings dropdown / mobile accordion */
export const HAPPENINGS_DROPDOWN = [
  {
    href: '/events',
    label: 'Events',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
] as const
