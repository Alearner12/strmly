// App constants and configuration
export const APP_CONFIG = {
  VIDEO_INTERSECTION_THRESHOLD: 0.7,
  AUTO_PLAY_DELAY: 100,
  INFINITE_SCROLL_THRESHOLD: 2,
  MAX_VIDEO_CACHE: 10,
  DOUBLE_TAP_DELAY: 300,
};

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'discover', label: 'Discover', path: '/discover' },
  { id: 'create', label: 'Create', path: '/create' },
  { id: 'inbox', label: 'Inbox', path: '/inbox' },
  { id: 'profile', label: 'Profile', path: '/profile' },
];

export const VIDEO_STATES = {
  LOADING: 'loading',
  PLAYING: 'playing',
  PAUSED: 'paused',
  ENDED: 'ended',
  ERROR: 'error',
};

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
};

export const COLORS = {
  PRIMARY: '#fe2c55',
  SECONDARY: '#25f4ee',
  DARK: '#161823',
  GRAY: '#9ca3af',
};

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
}; 