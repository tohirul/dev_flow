import { getAssets } from '@/lib/assets';

const { SUN, MOON, SYSTEM, HOME, USERS, STAR, SUITCASE, TAG, USER, QUESTION } = getAssets();

export const themes: ThemeInfo[] = [
  {
    label: 'Light',
    value: 'light',
    icon: SUN
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: MOON
  },
  {
    label: 'System',
    value: 'system',
    icon: SYSTEM
  }
];

export const sidebarLinks: SidebarLink[] = [
  {
    icon: HOME,
    route: '/',
    label: 'Home'
  },
  {
    icon: USERS,
    route: '/community',
    label: 'Community'
  },
  {
    icon: STAR,
    route: '/collection',
    label: 'Collections'
  },
  {
    icon: SUITCASE,
    route: '/jobs',
    label: 'Find Jobs'
  },
  {
    icon: TAG,
    route: '/tags',
    label: 'Tags'
  },
  {
    icon: USER,
    route: '/profile',
    label: 'Profile'
  },
  {
    icon: QUESTION,
    route: '/ask-question',
    label: 'Ask a question'
  }
];
