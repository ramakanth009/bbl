// src/components/chat/CategoryAnimationManager.js
import React, { useState, useEffect, useCallback } from 'react';

/**
 * CategoryAnimationManager - Handles loading and management of category-specific GIFs
 * This component manages the importing, preloading, and organization of animations by category
 */

// Category-to-GIF mapping configuration
const CATEGORY_ANIMATIONS = {
  entertainment_arts: [
    () => import('../../../assets/animations/entertainment/astronut1.gif'),
    // () => import('../../../assets/animations/entertainment/theater_mask.gif'),
    // () => import('../../../assets/animations/entertainment/art_brush.gif'),
  ],
  leaders_historical: [
    () => import('../../../assets/animations/leaders/Reactor.gif'),
    // () => import('../../../assets/animations/leaders/scroll.gif'),
    // () => import('../../../assets/animations/leaders/castle.gif'),
  ],
  sports_champions: [
    () => import('../../../assets/animations/sports/wicket.gif'),
    // () => import('../../../assets/animations/sports/medal.gif'),
    // () => import('../../../assets/animations/sports/flame.gif'),
  ],
  innovators_visionaries: [
    () => import('../../../assets/animations/innovators/astronut1.gif'),
    // () => import('../../../assets/animations/innovators/astronut2.gif'),
    // () => import('../../../assets/animations/innovators/programming.gif'),
  ],
  spiritual_social: [
    () => import('../../../assets/animations/spiritual/books.gif'),
    // () => import('../../../assets/animations/spiritual/meditation.gif'),
    // () => import('../../../assets/animations/spiritual/dove.gif'),
  ],
  fictional_anime: [
    () => import('../../../assets/animations/fictional/Gibli-Tribute.gif'),
    // () => import('../../../assets/animations/fictional/star.gif'),
    // () => import('../../../assets/animations/fictional/sword.gif'),
  ],
  // Fallback category for unknown categories
  default: [
    () => import('../../../assets/Reactor.gif'), // Current default
  ]
};

const CategoryAnimationManager = ({ 
  category, 
  onAnimationsReady, 
  onError 
}) => {
  const [loadedAnimations, setLoadedAnimations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get animations for a category with fallback
  const getAnimationsForCategory = useCallback((categoryKey) => {
    // Normalize category key
    const normalizedCategory = categoryKey?.toLowerCase();
    
    // Return animations for the category or fallback to default
    return CATEGORY_ANIMATIONS[normalizedCategory] || CATEGORY_ANIMATIONS.default;
  }, []);

  // Preload animations for a specific category
  const preloadAnimations = useCallback(async (categoryKey) => {
    if (!categoryKey) {
      console.warn('No category provided for animation preloading');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const animationImports = getAnimationsForCategory(categoryKey);
      console.log(`🎬 Preloading ${animationImports.length} animations for category: ${categoryKey}`);
      
      // Load all animations for the category
      const animationPromises = animationImports.map(async (importFn, index) => {
        try {
          const module = await importFn();
          return {
            id: `${categoryKey}_${index}`,
            src: module.default,
            category: categoryKey,
            index
          };
        } catch (error) {
          console.warn(`Failed to load animation ${index} for ${categoryKey}:`, error);
          // Return fallback animation
          const fallbackModule = await CATEGORY_ANIMATIONS.default[0]();
          return {
            id: `${categoryKey}_${index}_fallback`,
            src: fallbackModule.default,
            category: categoryKey,
            index,
            isFallback: true
          };
        }
      });

      const loadedAnims = await Promise.all(animationPromises);
      setLoadedAnimations(loadedAnims);
      
      console.log(`✅ Successfully preloaded ${loadedAnims.length} animations for ${categoryKey}`);
      
      // Notify parent component that animations are ready
      if (onAnimationsReady) {
        onAnimationsReady(loadedAnims);
      }
      
    } catch (error) {
      console.error('Failed to preload category animations:', error);
      setError(error.message);
      
      // Load fallback animations
      try {
        const fallbackModule = await CATEGORY_ANIMATIONS.default[0]();
        const fallbackAnimation = [{
          id: `${categoryKey}_fallback`,
          src: fallbackModule.default,
          category: categoryKey,
          index: 0,
          isFallback: true
        }];
        setLoadedAnimations(fallbackAnimation);
        
        if (onAnimationsReady) {
          onAnimationsReady(fallbackAnimation);
        }
      } catch (fallbackError) {
        console.error('Failed to load fallback animations:', fallbackError);
        if (onError) {
          onError(fallbackError);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [getAnimationsForCategory, onAnimationsReady, onError]);

  // Effect to preload animations when category changes
  useEffect(() => {
    if (category) {
      preloadAnimations(category);
    }
  }, [category, preloadAnimations]);

  // Public API for getting loaded animations
  const getLoadedAnimations = useCallback(() => {
    return loadedAnimations;
  }, [loadedAnimations]);

  // Public API for getting a specific animation by index
  const getAnimationByIndex = useCallback((index) => {
    return loadedAnimations[index] || loadedAnimations[0] || null;
  }, [loadedAnimations]);

  // Public API for checking if animations are ready
  const areAnimationsReady = useCallback(() => {
    return !loading && loadedAnimations.length > 0;
  }, [loading, loadedAnimations]);

  // Expose methods to parent component
  React.useImperativeHandle(React.forwardRef(), () => ({
    preloadAnimations,
    getLoadedAnimations,
    getAnimationByIndex,
    areAnimationsReady,
    loadedAnimations,
    loading,
    error
  }), [preloadAnimations, getLoadedAnimations, getAnimationByIndex, areAnimationsReady, loadedAnimations, loading, error]);

  // This component doesn't render anything - it's a utility component
  return null;
};

export default CategoryAnimationManager;