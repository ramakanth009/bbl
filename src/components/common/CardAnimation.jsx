import React, { useState, useEffect, useRef, useMemo } from 'react';
import { character } from './card-images';
import './CardAnimation.css';

const CardAnimation = () => {
  const [currentPhase, setCurrentPhase] = useState('phase-1');
  const [screenSize, setScreenSize] = useState('large');
  const [cardCount, setCardCount] = useState(0);
  const stageRef = useRef(null);
  const rippleRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  // Screen size detection for responsive card count
  const getScreenInfo = useMemo(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    let cols, rows, cardSize;
    
    // Calculate aspect ratio to maintain consistent spacing
    const aspectRatio = width / height;
    
    if (width >= 1920) {
      cols = 25; rows = Math.round(25 / aspectRatio); cardSize = 90;
    } else if (width >= 1600) {
      cols = 22; rows = Math.round(22 / aspectRatio); cardSize = 85;
    } else if (width >= 1440) {
      cols = 20; rows = Math.round(20 / aspectRatio); cardSize = 80;
    } else if (width >= 1200) {
      cols = 18; rows = Math.round(18 / aspectRatio); cardSize = 75;
    } else if (width >= 992) {
      cols = 16; rows = Math.round(16 / aspectRatio); cardSize = 70;
    } else if (width >= 768) {
      cols = 14; rows = Math.round(14 / aspectRatio); cardSize = 65;
    } else if (width >= 576) {
      cols = 12; rows = Math.round(12 / aspectRatio); cardSize = 55;
    } else if (width >= 480) {
      cols = 10; rows = Math.round(10 / aspectRatio); cardSize = 50;
    } else {
      cols = 8; rows = Math.round(8 / aspectRatio); cardSize = 40;
    }
    
    // Adjust for very tall screens
    if (height > width * 1.3) {
      rows = Math.min(rows + 4, 20);
    }
    
    const totalCards = cols * rows;
    
    return { 
      size: width >= 1920 ? 'xl' : width >= 1440 ? 'lg' : width >= 992 ? 'md' : 'sm',
      cards: totalCards,
      cols: cols,
      rows: rows,
      cardSize: cardSize
    };
  }, []);

  // Update screen size on mount and resize
  useEffect(() => {
    const updateScreenSize = () => {
      const info = getScreenInfo;
      setScreenSize(info.size);
      setCardCount(info.cards);
    };

    updateScreenSize();
    
    const handleResize = () => {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        updateScreenSize();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeoutRef.current);
    };
  }, [getScreenInfo]);

  // Calculate grid positions
  const calculateGridPositions = (count) => {
    const positions = [];
    const info = getScreenInfo;
    const cols = info.cols;
    const rows = info.rows;
    const maxCards = cols * rows;
    const actualCards = Math.min(count, maxCards);
    
    const marginX = 3;
    const marginY = 3;
    const availableWidth = 100 - (marginX * 2);
    const availableHeight = 100 - (marginY * 2);
    const stepX = cols > 1 ? availableWidth / (cols - 1) : 0;
    const stepY = rows > 1 ? availableHeight / (rows - 1) : 0;
    
    let index = 0;
    for (let row = 0; row < rows && index < actualCards; row++) {
      for (let col = 0; col < cols && index < actualCards; col++) {
        const x = marginX + (col * stepX);
        const y = marginY + (row * stepY);
        positions.push({ x, y });
        index++;
      }
    }
    
    return positions;
  };

  // Calculate ripple positions (slightly adjusted)
  const calculateRipplePositions = (count) => {
    const positions = [];
    const info = getScreenInfo;
    const cols = info.cols;
    const rows = info.rows;
    const maxCards = cols * rows;
    const actualCards = Math.min(count, maxCards);
    
    const marginX = 2.5;
    const marginY = 2.5;
    const availableWidth = 100 - (marginX * 2);
    const availableHeight = 100 - (marginY * 2);
    const stepX = cols > 1 ? availableWidth / (cols - 1) : 0;
    const stepY = rows > 1 ? availableHeight / (rows - 1) : 0;
    
    let index = 0;
    for (let row = 0; row < rows && index < actualCards; row++) {
      for (let col = 0; col < cols && index < actualCards; col++) {
        const x = marginX + (col * stepX);
        const y = marginY + (row * stepY);
        positions.push({ x, y });
        index++;
      }
    }
    
    return positions;
  };

  // Generate card data
  const cardData = useMemo(() => {
    const cards = [];
    const gridPositions = calculateGridPositions(cardCount);
    const ripplePositions = calculateRipplePositions(cardCount);
    const availableImages = Math.min(cardCount, character.length);
    
    for (let i = 0; i < cardCount; i++) {
      const imageIndex = i % character.length;
      cards.push({
        id: i,
        image: character[imageIndex],
        gridPosition: gridPositions[i] || { x: 50, y: 50 },
        ripplePosition: ripplePositions[i] || { x: 50, y: 50 },
        size: getScreenInfo.cardSize
      });
    }
    
    return cards;
  }, [cardCount, getScreenInfo]);

  // Start animation sequence - much faster
  const startAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Reset to phase 1
    setCurrentPhase('phase-1');
    if (rippleRef.current) {
      rippleRef.current.classList.remove('active');
    }

    // Phase 2: Images expand to grid positions (after 0.5 seconds)
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentPhase('phase-2');
    }, 500);

    // Phase 3: Ripple effect (after 2 seconds total)
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentPhase('phase-3');
      if (rippleRef.current) {
        rippleRef.current.classList.add('active');
      }
      
      // Dispatch custom event when ripple starts for Login card reveal
      // Delay slightly so login card emerges from the ripple
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('cardAnimationRipple'));
      }, 200);
    }, 2000);
  };

  // Initialize animation on mount - start immediately
  useEffect(() => {
    // Only start the animation if we haven't already
    if (currentPhase === 'phase-1') {
      startAnimation();
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // REMOVED: Restart animation when card count changes

  // Apply staggered ripple effect for phase 3
  const getCardStyle = (card, index) => {
    const baseStyle = {
      backgroundImage: `url(${card.image})`,
      width: `${card.size}px`,
      height: `${card.size}px`,
    };

    if (currentPhase === 'phase-2') {
      return {
        ...baseStyle,
        left: `${card.gridPosition.x}%`,
        top: `${card.gridPosition.y}%`,
      };
    }

    if (currentPhase === 'phase-3') {
      const centerX = 50;
      const centerY = 50;
      const dx = card.ripplePosition.x - centerX;
      const dy = card.ripplePosition.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const delay = distance * 10;

      return {
        ...baseStyle,
        left: `${card.ripplePosition.x}%`,
        top: `${card.ripplePosition.y}%`,
        transitionDelay: `${delay}ms`,
      };
    }

    return baseStyle;
  };

  return (
    <div 
      ref={stageRef}
      className={`card-animation-stage ${currentPhase}`}
    >
      {cardData.map((card, index) => (
        <div
          key={card.id}
          className="character-image"
          style={getCardStyle(card, index)}
        />
      ))}
      
      <div 
        ref={rippleRef}
        className="ripple-wave" 
      />
    </div>
  );
};

export default CardAnimation;