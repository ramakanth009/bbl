// src/components/chat/CategoryLoadingAnimation.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import CategoryAnimationManager from './CategoryAnimationManager';

/**
 * CategoryLoadingAnimation - Displays sequential category-specific loading animations
 * This component handles the display logic and sequential playback of loading GIFs
 */

const CategoryLoadingAnimation = ({ 
  category, 
  loading, 
  className,
  style,
  size = 50,
  autoPlay = true,
  cycleInterval = 3000, // 3 seconds per animation
  onAnimationChange
}) => {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [animations, setAnimations] = useState([]);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [error, setError] = useState(null);
  
  const cycleTimerRef = useRef(null);
  const mountedRef = useRef(true);
  const animationManagerRef = useRef(null);

  // Handle animations ready callback
  const handleAnimationsReady = useCallback((loadedAnimations) => {
    if (!mountedRef.current) return;
    
    console.log(`🎬 CategoryLoadingAnimation: Animations ready for ${category}`, loadedAnimations);
    setAnimations(loadedAnimations);
    setAnimationsReady(true);
    setCurrentAnimationIndex(0);
    setError(null);
  }, [category]);

  // Handle animation loading error
  const handleAnimationError = useCallback((error) => {
    if (!mountedRef.current) return;
    
    console.error('CategoryLoadingAnimation: Animation loading error:', error);
    setError(error);
    setAnimationsReady(false);
  }, []);

  // Start the animation cycling
  const startCycling = useCallback(() => {
    if (!autoPlay || !animationsReady || animations.length <= 1) {
      return;
    }

    // Clear existing timer
    if (cycleTimerRef.current) {
      clearInterval(cycleTimerRef.current);
    }

    cycleTimerRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      
      setCurrentAnimationIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % animations.length;
        
        // Notify parent of animation change
        if (onAnimationChange && animations[nextIndex]) {
          onAnimationChange(animations[nextIndex], nextIndex);
        }
        
        return nextIndex;
      });
    }, cycleInterval);
  }, [autoPlay, animationsReady, animations.length, cycleInterval, onAnimationChange]);

  // Stop the animation cycling
  const stopCycling = useCallback(() => {
    if (cycleTimerRef.current) {
      clearInterval(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
  }, []);

  // Effect to start/stop cycling based on loading state
  useEffect(() => {
    if (loading && animationsReady && animations.length > 0) {
      startCycling();
    } else {
      stopCycling();
    }

    return stopCycling;
  }, [loading, animationsReady, animations.length, startCycling, stopCycling]);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
      stopCycling();
    };
  }, [stopCycling]);

  // Reset animation index when category changes
  useEffect(() => {
    setCurrentAnimationIndex(0);
    setAnimationsReady(false);
    setError(null);
  }, [category]);

  // Get current animation
  const currentAnimation = animationsReady && animations.length > 0 
    ? animations[currentAnimationIndex] 
    : null;

  // Don't render if not loading
  if (!loading) {
    return null;
  }

  // Show error state (fallback to default animation)
  if (error && !currentAnimation) {
    return (
      <Box
        className={className}
        style={style}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="div"
          sx={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 1.5s ease-in-out infinite',
            '@keyframes pulse': {
              '0%': {
                opacity: 0.6,
                transform: 'scale(0.95)',
              },
              '50%': {
                opacity: 1,
                transform: 'scale(1.05)',
              },
              '100%': {
                opacity: 0.6,
                transform: 'scale(0.95)',
              },
            },
          }}
        >
          <Box
            sx={{
              width: `${size * 0.3}px`,
              height: `${size * 0.3}px`,
              backgroundColor: '#6366f1',
              borderRadius: '50%',
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      {/* Animation Manager Component */}
      <CategoryAnimationManager
        ref={animationManagerRef}
        category={category}
        onAnimationsReady={handleAnimationsReady}
        onError={handleAnimationError}
      />
      
      {/* Animation Display */}
      {currentAnimation && (
        <Box
          className={className}
          style={style}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={currentAnimation.src}
            alt={`Loading animation for ${category}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              objectFit: 'contain',
              transition: 'opacity 0.3s ease-in-out',
            }}
            onError={(e) => {
              console.warn('Failed to load animation image:', currentAnimation.src);
              // Try to load next animation if available
              if (animations.length > 1) {
                setCurrentAnimationIndex(prev => (prev + 1) % animations.length);
              }
            }}
            onLoad={() => {
              console.log(`🎬 Animation loaded: ${currentAnimation.id}`);
            }}
          />
        </Box>
      )}
    </>
  );
};

export default CategoryLoadingAnimation;