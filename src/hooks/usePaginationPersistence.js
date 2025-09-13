// src/hooks/usePaginationPersistence.js
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

/**
 * Custom hook for URL-based pagination persistence
 * Maintains pagination state in URL query parameters to survive page reloads
 * 
 * @param {number} defaultPage - Default page number (usually 1)
 * @param {number} defaultPageSize - Default items per page (usually 20)
 * @param {string} section - Optional section identifier for isolated pagination
 * @returns {Object} Pagination state and handlers
 */
export const usePaginationPersistence = (defaultPage = 1, defaultPageSize = 24, section = null) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  // Create section-specific parameter names if section is provided
  const pageParam = section ? `${section}_page` : 'page';
  const pageSizeParam = section ? `${section}_pageSize` : 'pageSize';
  
  // Get initial values from URL or defaults
  const getInitialPage = useCallback(() => {
    const urlPage = searchParams.get(pageParam);
    const page = urlPage ? parseInt(urlPage, 10) : defaultPage;
    // Validate page number
    return isNaN(page) || page < 1 ? defaultPage : page;
  }, [searchParams, pageParam, defaultPage]);
  
  const getInitialPageSize = useCallback(() => {
    const urlPageSize = searchParams.get(pageSizeParam);
    const pageSize = urlPageSize ? parseInt(urlPageSize, 10) : defaultPageSize;
    // Validate page size - Updated range from 24 to 100
    const validSizes = [24, 48, 72, 100];
    return validSizes.includes(pageSize) ? pageSize : defaultPageSize;
  }, [searchParams, pageSizeParam, defaultPageSize]);
  
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [pageSize, setPageSize] = useState(getInitialPageSize);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Update URL when page or pageSize changes
  const updateURL = useCallback((page, size, replace = true) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    // Handle page parameter
    if (page !== defaultPage) {
      newSearchParams.set(pageParam, page.toString());
    } else {
      newSearchParams.delete(pageParam);
    }
    
    // Handle page size parameter
    if (size !== defaultPageSize) {
      newSearchParams.set(pageSizeParam, size.toString());
    } else {
      newSearchParams.delete(pageSizeParam);
    }
    
    // Update URL without causing navigation
    setSearchParams(newSearchParams, { replace });
  }, [searchParams, setSearchParams, pageParam, pageSizeParam, defaultPage, defaultPageSize]);
  
  // Handle page change
  const handlePageChange = useCallback((event, newPage) => {
    console.log(`📄 Page changed to: ${newPage} ${section ? `(${section})` : ''}`);
    setCurrentPage(newPage);
    updateURL(newPage, pageSize);
    
    // Optional: Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageSize, updateURL, section]);
  
  // Handle page size change
  const handlePageSizeChange = useCallback((event) => {
    const newPageSize = typeof event === 'object' ? event.target.value : event;
    console.log(`📏 Page size changed to: ${newPageSize} ${section ? `(${section})` : ''}`);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
    updateURL(1, newPageSize);
  }, [updateURL, section]);
  
  // Reset pagination (useful for search/filter changes)
  const resetPagination = useCallback(() => {
    console.log(`🔄 Pagination reset ${section ? `(${section})` : ''}`);
    setCurrentPage(1);
    updateURL(1, pageSize);
  }, [pageSize, updateURL, section]);
  
  // Initialize from URL on mount and when URL changes
  useEffect(() => {
    const urlPage = getInitialPage();
    const urlPageSize = getInitialPageSize();
    
    let hasChanges = false;
    
    if (urlPage !== currentPage) {
      setCurrentPage(urlPage);
      hasChanges = true;
    }
    
    if (urlPageSize !== pageSize) {
      setPageSize(urlPageSize);
      hasChanges = true;
    }
    
    if (hasChanges || !isInitialized) {
      console.log(`🔧 Pagination initialized ${section ? `(${section})` : ''}: page=${urlPage}, pageSize=${urlPageSize}`);
      setIsInitialized(true);
    }
  }, [location.search, section, getInitialPage, getInitialPageSize, currentPage, pageSize, isInitialized]);
  
  // Helper function to get pagination info for display
  const getPaginationInfo = useCallback((totalCount) => {
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(currentPage * pageSize, totalCount);
    const totalPages = Math.ceil(totalCount / pageSize);
    
    return {
      startIndex,
      endIndex,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === totalPages
    };
  }, [currentPage, pageSize]);
  
  // Helper function to build API parameters
  const getApiParams = useCallback((additionalParams = {}) => {
    return {
      page: currentPage,
      per_page: pageSize,
      ...additionalParams
    };
  }, [currentPage, pageSize]);
  
  return {
    // Current state
    currentPage,
    pageSize,
    isInitialized,
    
    // Handlers
    handlePageChange,
    handlePageSizeChange,
    resetPagination,
    updateURL,
    
    // Helpers
    getPaginationInfo,
    getApiParams,
    
    // Computed values
    isFirstPage: currentPage === 1,
    
    // For debugging
    urlParams: {
      [pageParam]: searchParams.get(pageParam),
      [pageSizeParam]: searchParams.get(pageSizeParam)
    }
  };
};

/**
 * Hook for search query persistence in URL
 * Works alongside pagination persistence
 */
export const useSearchPersistence = (section = null) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const queryParam = section ? `${section}_q` : 'q';
  const searchQuery = searchParams.get(queryParam) || '';
  
  const setSearchQuery = useCallback((query) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (query && query.trim()) {
      newSearchParams.set(queryParam, query.trim());
      // Reset pagination when searching
      const pageParam = section ? `${section}_page` : 'page';
      newSearchParams.delete(pageParam);
    } else {
      newSearchParams.delete(queryParam);
    }
    
    setSearchParams(newSearchParams, { replace: true });
  }, [searchParams, setSearchParams, queryParam, section]);
  
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);
  
  return {
    searchQuery,
    setSearchQuery,
    clearSearch,
    hasActiveSearch: Boolean(searchQuery)
  };
};

/**
 * Hook for filter persistence in URL
 * Manages multiple filter parameters
 */
export const useFilterPersistence = (section = null) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const getFilterParam = useCallback((filterName) => {
    return section ? `${section}_${filterName}` : filterName;
  }, [section]);
  
  const getActiveFilters = useCallback(() => {
    const filters = {};
    const prefix = section ? `${section}_` : '';
    
    for (const [key, value] of searchParams.entries()) {
      if (section ? key.startsWith(prefix) : !key.includes('_')) {
        const filterKey = section ? key.replace(prefix, '') : key;
        // Skip pagination and search parameters
        if (!['page', 'pageSize', 'q'].includes(filterKey)) {
          filters[filterKey] = value;
        }
      }
    }
    
    return filters;
  }, [searchParams, section]);
  
  const updateFilters = useCallback((filters, resetPagination = true) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    Object.entries(filters).forEach(([key, value]) => {
      const paramName = getFilterParam(key);
      
      if (value && value !== '' && value !== 'all') {
        newSearchParams.set(paramName, value);
      } else {
        newSearchParams.delete(paramName);
      }
    });
    
    // Reset pagination when filters change
    if (resetPagination) {
      const pageParam = getFilterParam('page');
      newSearchParams.delete(pageParam);
    }
    
    setSearchParams(newSearchParams, { replace: true });
  }, [searchParams, setSearchParams, getFilterParam]);
  
  const clearFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    const prefix = section ? `${section}_` : '';
    
    // Remove all filter parameters
    for (const key of Array.from(newSearchParams.keys())) {
      if (section ? key.startsWith(prefix) : !key.includes('_')) {
        const filterKey = section ? key.replace(prefix, '') : key;
        if (!['page', 'pageSize', 'q'].includes(filterKey)) {
          newSearchParams.delete(key);
        }
      }
    }
    
    setSearchParams(newSearchParams, { replace: true });
  }, [searchParams, setSearchParams, section]);
  
  return {
    activeFilters: getActiveFilters(),
    updateFilters,
    clearFilters,
    hasActiveFilters: Object.keys(getActiveFilters()).length > 0
  };
};