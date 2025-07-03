import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  cardStars: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.22,
  },
}));

const CardStarPattern = () => {
  const classes = useStyles();
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 600; i++) {
      const size = Math.random() * 1.5 + 0.5;
      const color = Math.random() > 0.5 ? '#fff' : '#bcdcff';
      arr.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size,
        color,
        opacity: Math.random() * 0.3 + 0.7,
      });
    }
    return arr;
  }, []);
  return (
    <div className={classes.cardStars}>
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.color,
            borderRadius: '50%',
            opacity: star.opacity,
            filter: 'blur(0.1px)',
          }}
        />
      ))}
    </div>
  );
};

export default CardStarPattern;
