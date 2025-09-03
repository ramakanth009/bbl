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
    
    let cardWidth, cardHeight;
    
    // Calculate card dimensions based on screen size
    if (width >= 1920) {
      cardWidth = 90; cardHeight = 90;
    } else if (width >= 1600) {
      cardWidth = 85; cardHeight = 85;
    } else if (width >= 1440) {
      cardWidth = 80; cardHeight = 80;
    } else if (width >= 1200) {
      cardWidth = 75; cardHeight = 75;
    } else if (width >= 992) {
      cardWidth = 70; cardHeight = 70;
    } else if (width >= 768) {
      cardWidth = 65; cardHeight = 65;
    } else if (width >= 576) {
      cardWidth = 55; cardHeight = 55;
    } else if (width >= 480) {
      cardWidth = 50; cardHeight = 50;
    } else {
      cardWidth = 40; cardHeight = 40;
    }
    
    // Calculate how many cards fit perfectly with no gaps
    const cols = Math.ceil(width / cardWidth);
    const rows = Math.ceil(height / cardHeight);
    const totalCards = cols * rows;
    
    return { 
      size: width >= 1920 ? 'xl' : width >= 1440 ? 'lg' : width >= 992 ? 'md' : 'sm',
      cards: totalCards,
      cols: cols,
      rows: rows,
      cardWidth: cardWidth,
      cardHeight: cardHeight
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

  // Calculate grid positions with no gaps
  const calculateGridPositions = (count) => {
    const positions = [];
    const info = getScreenInfo;
    const cols = info.cols;
    const rows = info.rows;
    const cardWidth = info.cardWidth;
    const cardHeight = info.cardHeight;
    const actualCards = Math.min(count, cols * rows);
    
    let index = 0;
    for (let row = 0; row < rows && index < actualCards; row++) {
      for (let col = 0; col < cols && index < actualCards; col++) {
        const x = col * cardWidth;
        const y = row * cardHeight;
        positions.push({ x, y });
        index++;
      }
    }
    
    return positions;
  };

  // Calculate ripple positions (same as grid for seamless effect)
  const calculateRipplePositions = (count) => {
    return calculateGridPositions(count);
  };

  // Generate card data
  const cardData = useMemo(() => {
    const cards = [];
    const gridPositions = calculateGridPositions(cardCount);
    const ripplePositions = calculateRipplePositions(cardCount);
    
    for (let i = 0; i < cardCount; i++) {
      const imageIndex = i % character.length;
      cards.push({
        id: i,
        image: character[imageIndex],
        gridPosition: gridPositions[i] || { x: 0, y: 0 },
        ripplePosition: ripplePositions[i] || { x: 0, y: 0 },
        width: getScreenInfo.cardWidth,
        height: getScreenInfo.cardHeight
      });
    }
    
    return cards;
  }, [cardCount, getScreenInfo]);

  // Start animation sequence
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

  // Apply staggered ripple effect for phase 3
  const getCardStyle = (card, index) => {
    const baseStyle = {
      backgroundImage: `url(${card.image})`,
      width: `${card.width}px`,
      height: `${card.height}px`,
    };

    if (currentPhase === 'phase-2') {
      return {
        ...baseStyle,
        left: `${card.gridPosition.x}px`,
        top: `${card.gridPosition.y}px`,
      };
    }

    if (currentPhase === 'phase-3') {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const cardCenterX = card.ripplePosition.x + (card.width / 2);
      const cardCenterY = card.ripplePosition.y + (card.height / 2);
      const dx = cardCenterX - centerX;
      const dy = cardCenterY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const delay = distance * 2;

      return {
        ...baseStyle,
        left: `${card.ripplePosition.x}px`,
        top: `${card.ripplePosition.y}px`,
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