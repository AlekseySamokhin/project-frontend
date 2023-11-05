// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_TEAMS = '/teams';
const ROOTS_BROWSERS = '/browsers/folders';
const ROOTS_TRACKING = '/tracking/folders';
const ROOTS_HELP = '/help';
// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_MAIN_PAGE = {
  payment: '/payment',
  settings: '/settings',
  tracking: '/tracking',
  api: '/api',
  automation: '/automation',
};

export const PATH_TEAMS = {
  root: ROOTS_TEAMS,
  teamId: (teamId) => path(ROOTS_TEAMS, `/${teamId}`),
};

export const PATH_HELP = {
  root: ROOTS_HELP,
  articlesCardId: (cardId) => path(ROOTS_HELP, `/${cardId}/articles`),
  articleId: (cardId, articleId) => path(ROOTS_HELP, `/${cardId}/articles/${articleId}`),
};

export const PATH_BROWSERS = {
  root: ROOTS_BROWSERS,
  profiles: (folderId) => path(ROOTS_BROWSERS, `/${folderId}/profiles`),
  proxies: (folderId) => path(ROOTS_BROWSERS, `/${folderId}/proxies`),
  tags: (folderId) => path(ROOTS_BROWSERS, `/${folderId}/tags`),
  statuses: (folderId) => path(ROOTS_BROWSERS, `/${folderId}/statuses`),
  extras: (folderId) => path(ROOTS_BROWSERS, `/${folderId}/extras`),
};

export const PATH_TRACKING = {
  root: ROOTS_TRACKING,
  folder: (folderId) => path(ROOTS_TRACKING, `/${folderId}`),
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
