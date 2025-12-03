import React, { useMemo } from 'react';
import styles from './WindIndicator.module.css';

const getCardinalDirection = (angle) => {
  const directions = ['NORTH', 'NE', 'EAST', 'SE', 'SOUTH', 'SW', 'WEST', 'NW'];
  const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index];
};

const WindIndicator = ({ direction = 0, speed = 0, gust = 0, size = 250 }) => {

  const ticks = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const angle = i * 6;
      const isNorth = i === 0 || i === 59 || i === 1;
      return { angle, isNorth };
    });
  }, []);

  const formattedSpeed = Number(speed).toFixed(1);
  const cardinal = getCardinalDirection(direction);

  return (
    <div className={styles.widgetWrapper}>

      <div className={`flex flex-col gap-2 items-center justify-center h-full ${styles.contentRelative}`}>
        <div className={styles.labelTop}>CURRENT WIND</div>
        <div className={styles.container} style={{ width: size, height: size }}>
          <div className={styles.gaugeRing}>
            <svg viewBox="0 0 100 100" className={styles.gaugeSvg}>
              {ticks.map((tick, i) => (
                <line
                  key={i}
                  x1="50" y1="6" x2="50" y2={tick.isNorth ? "14" : "12"}
                  stroke={tick.isNorth ? "#fde047" : "rgba(255, 255, 255, 0.2)"}
                  strokeWidth={tick.isNorth ? "3" : "2"}
                  transform={`rotate(${tick.angle} 50 50)`}
                  strokeLinecap="butt"
                />
              ))}

              <text x="50" y="24" className={`${styles.cardinalLabel} ${styles.cardinalLabelN}`}>N</text>
              <text x="80" y="52" className={styles.cardinalLabel}>E</text>
              <text x="50" y="80" className={styles.cardinalLabel}>S</text>
              <text x="20" y="52" className={styles.cardinalLabel}>W</text>
            </svg>
          </div>

          <div
            className={styles.gaugeIndicator}
            style={{ transform: `rotate(${direction}deg)` }}
          >
            <svg viewBox="0 0 100 100">
              <rect x="48.5" y="4" width="3" height="12" fill="white" rx="1" />
            </svg>
          </div>

          <div className={styles.gaugeData}>

            <div className={styles.directionText}>
              <span className={styles.deg}>{Math.round(direction)}°</span>
              <span className="card">{cardinal}</span>
            </div>

            <div className={styles.speedGroup}>
              <span className={styles.speedVal}>{formattedSpeed}</span>
              <span className={styles.speedUnit}>Kts</span>
            </div>

            {gust > 0 && (
              <div className={styles.gustRow}>
                <span className={styles.gustIcon} style={{ fontSize: '14px'}}>↑</span>
                Wind Gust <span className={styles.gustVal}>{gust} kts</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindIndicator;