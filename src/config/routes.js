// routes.js - Centralized routing configuration

export const ROUTES = {
  // Public routes
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Dashboard routes
  DASHBOARD: '/dashboard',
  DISCOVER: '/dashboard/discover',
  FEATURED: '/dashboard/featured',
  TRENDING: '/dashboard/trending',
  FOR_YOU: '/dashboard/for-you',
  RECENT: '/dashboard/recent',
  
  // Chat routes
  CHAT: '/chat/:characterName',
  
  // Default route
  ROOT: '/',
};

export const DASHBOARD_SECTIONS = {
  DISCOVER: 'Discover',
  FEATURED: 'Featured',
  TRENDING: 'Trending',
  FOR_YOU: 'For You',
  RECENT: 'Recent',
};

// Map URL paths to section names
export const PATH_TO_SECTION = {
  '/dashboard/discover': DASHBOARD_SECTIONS.DISCOVER,
  '/dashboard/featured': DASHBOARD_SECTIONS.FEATURED,
  '/dashboard/trending': DASHBOARD_SECTIONS.TRENDING,
  '/dashboard/for-you': DASHBOARD_SECTIONS.FOR_YOU,
  '/dashboard/recent': DASHBOARD_SECTIONS.RECENT,
};

// Map section names to URL paths
export const SECTION_TO_PATH = {
  [DASHBOARD_SECTIONS.DISCOVER]: ROUTES.DISCOVER,
  [DASHBOARD_SECTIONS.FEATURED]: ROUTES.FEATURED,
  [DASHBOARD_SECTIONS.TRENDING]: ROUTES.TRENDING,
  [DASHBOARD_SECTIONS.FOR_YOU]: ROUTES.FOR_YOU,
  [DASHBOARD_SECTIONS.RECENT]: ROUTES.RECENT,
};

export default ROUTES;