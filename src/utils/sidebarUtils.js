/**
 * Centralized Sidebar State Management Utilities
 * 
 * This file provides standardized breakpoints, width calculations, and state management
 * for consistent sidebar behavior across all components in the application.
 */

// FIXED: Standardized breakpoints - eliminated the 901-960px dead zone
export const BREAKPOINTS = {
  MOBILE: 900,      // Below this = mobile (overlay sidebar)
  TABLET: 1200,     // 901-1200 = tablet range (unified)
  DESKTOP: 1200     // Above this = desktop
};

// FIXED: Simplified sidebar widths with consistent tablet treatment
export const SIDEBAR_WIDTHS = {
  EXPANDED: {
    MOBILE: 280,      // Mobile overlay always 280px
    TABLET: 260,      // 901-1200px viewport (unified range)
    DESKTOP: 280      // >1200px viewport
  },
  COLLAPSED: {
    MOBILE: 0,        // Mobile doesn't use collapsed state (uses overlay)
    TABLET: 65,       // 901-1200px viewport (unified range)
    DESKTOP: 70       // >1200px viewport
  }
};

/**
 * Determines if the current viewport is mobile based on standardized breakpoint
 * @param {number} viewportWidth - Current viewport width
 * @returns {boolean} True if mobile
 */
export const isMobileViewport = (viewportWidth) => {
  return viewportWidth <= BREAKPOINTS.MOBILE;
};

/**
 * Determines if the current viewport is tablet based on standardized breakpoint
 * @param {number} viewportWidth - Current viewport width
 * @returns {boolean} True if tablet
 */
export const isTabletViewport = (viewportWidth) => {
  return viewportWidth > BREAKPOINTS.MOBILE && viewportWidth <= BREAKPOINTS.TABLET;
};

/**
 * Determines if the current viewport is desktop based on standardized breakpoint
 * @param {number} viewportWidth - Current viewport width
 * @returns {boolean} True if desktop
 */
export const isDesktopViewport = (viewportWidth) => {
  return viewportWidth > BREAKPOINTS.TABLET;
};

/**
 * Gets the appropriate sidebar width based on viewport size and sidebar state
 * @param {number} viewportWidth - Current viewport width
 * @param {boolean} isOpen - Whether sidebar is open/expanded
 * @param {boolean} isMobile - Whether we're in mobile mode
 * @returns {number} Sidebar width in pixels
 */
export const getSidebarWidth = (viewportWidth, isOpen, isMobile) => {
  // Mobile uses overlay (0 when closed, 280 when open)
  if (isMobile) {
    return isOpen ? SIDEBAR_WIDTHS.EXPANDED.MOBILE : SIDEBAR_WIDTHS.COLLAPSED.MOBILE;
  }
  
  // Desktop/tablet uses expanded/collapsed states
  if (isOpen) {
    // Expanded widths - treat 901-1200px as unified tablet range
    if (viewportWidth <= BREAKPOINTS.TABLET) return SIDEBAR_WIDTHS.EXPANDED.TABLET;
    return SIDEBAR_WIDTHS.EXPANDED.DESKTOP;
  } else {
    // Collapsed widths - treat 901-1200px as unified tablet range
    if (viewportWidth <= BREAKPOINTS.TABLET) return SIDEBAR_WIDTHS.COLLAPSED.TABLET;
    return SIDEBAR_WIDTHS.COLLAPSED.DESKTOP;
  }
};

/**
 * Calculates the available width for content (like chat panel) after accounting for sidebar
 * @param {number} viewportWidth - Current viewport width
 * @param {boolean} isOpen - Whether sidebar is open/expanded
 * @param {boolean} isMobile - Whether we're in mobile mode
 * @returns {string} CSS calc() expression for content width
 */
export const getContentWidth = (viewportWidth, isOpen, isMobile) => {
  // Mobile always uses full viewport width (sidebar is overlay)
  if (isMobile) {
    return '100vw';
  }
  
  const sidebarWidth = getSidebarWidth(viewportWidth, isOpen, isMobile);
  return `calc(100vw - ${sidebarWidth}px)`;
};

/**
 * Creates a comprehensive sidebar state object with all necessary properties
 * @param {Object} params - Parameters for creating sidebar state
 * @param {boolean} params.sidebarOpen - Desktop sidebar open state
 * @param {boolean} params.mobileSidebarOpen - Mobile sidebar open state
 * @param {number} params.viewportWidth - Current viewport width
 * @param {boolean} params.isMobile - Mobile detection result
 * @returns {Object} Complete sidebar state object
 */
export const createSidebarState = ({ 
  sidebarOpen, 
  mobileSidebarOpen, 
  viewportWidth, 
  isMobile 
}) => {
  const actualWidth = getSidebarWidth(viewportWidth, isMobile ? mobileSidebarOpen : sidebarOpen, isMobile);
  
  return {
    // Core state
    isOpen: isMobile ? mobileSidebarOpen : sidebarOpen,
    isMobile,
    viewportWidth,
    sidebarWidth: actualWidth,
    isCollapsed: isMobile ? false : !sidebarOpen,
    
    // Enhanced properties
    actualWidth, // Single source of truth for actual visual width
    isDesktop: !isMobile,
    isMobileOverlay: isMobile && mobileSidebarOpen,
    
    // Breakpoint helpers
    isMobileBreakpoint: isMobileViewport(viewportWidth),
    isTabletBreakpoint: isTabletViewport(viewportWidth),
    isDesktopBreakpoint: isDesktopViewport(viewportWidth),
    
    // State helpers for child components
    shouldShowMobileOverlay: isMobile && mobileSidebarOpen,
    shouldRenderSidebar: !isMobile || mobileSidebarOpen,
    
    // Width calculation helpers
    getCalculatedChatWidth: () => getContentWidth(viewportWidth, isMobile ? mobileSidebarOpen : sidebarOpen, isMobile),
    getCalculatedContentWidth: () => getContentWidth(viewportWidth, isMobile ? mobileSidebarOpen : sidebarOpen, isMobile),
    
    // Utility functions
    getSidebarWidth: () => actualWidth,
    getContentWidth: () => getContentWidth(viewportWidth, isMobile ? mobileSidebarOpen : sidebarOpen, isMobile),
    
    // Debug info (only in development)
    ...(process.env.NODE_ENV === 'development' && {
      debug: {
        timestamp: Date.now(),
        calculations: {
          getSidebarWidth: actualWidth,
          getContentWidth: getContentWidth(viewportWidth, isMobile ? mobileSidebarOpen : sidebarOpen, isMobile),
          isMobile,
          sidebarOpen,
          mobileSidebarOpen,
          viewportWidth,
          breakpointUsed: isMobile ? 'MOBILE' : 
                         viewportWidth <= BREAKPOINTS.TABLET ? 'TABLET' : 'DESKTOP'
        }
      }
    })
  };
};

/**
 * Hook for consistent mobile detection across components
 * @param {number} viewportWidth - Current viewport width
 * @returns {boolean} True if mobile
 */
export const useMobileDetection = (viewportWidth) => {
  return isMobileViewport(viewportWidth);
};

/**
 * CSS media query strings for consistent breakpoints
 */
export const MEDIA_QUERIES = {
  MOBILE: `@media (max-width: ${BREAKPOINTS.MOBILE}px)`,
  TABLET: `@media (max-width: ${BREAKPOINTS.TABLET}px)`,
  DESKTOP: `@media (min-width: ${BREAKPOINTS.TABLET + 1}px)`,
  
  // Specific ranges
  MOBILE_ONLY: `@media (max-width: ${BREAKPOINTS.MOBILE}px)`,
  TABLET_ONLY: `@media (min-width: ${BREAKPOINTS.MOBILE + 1}px) and (max-width: ${BREAKPOINTS.TABLET}px)`,
  DESKTOP_ONLY: `@media (min-width: ${BREAKPOINTS.TABLET + 1}px)`
};

export default {
  BREAKPOINTS,
  SIDEBAR_WIDTHS,
  isMobileViewport,
  isTabletViewport,
  isDesktopViewport,
  getSidebarWidth,
  getContentWidth,
  createSidebarState,
  useMobileDetection,
  MEDIA_QUERIES
};