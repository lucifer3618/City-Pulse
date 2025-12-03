import React, { useMemo } from 'react';

const FullWidthGraph = ({ color = '#3B82F6', width, height }) => {
  const gradientId = useMemo(() => `grad-${Math.random().toString(36).slice(2)}`, []);

  const { linePath, fillPath, startY, endY } = useMemo(() => {

    const min = 2;
    const max = 48;
    const range = max - min;

    const randY = () => Math.floor(Math.random() * range) + min;

    const startY = randY();
    const endY = randY();

    const linePathStr = `
      M 0 ${startY} 
      C 30 ${randY()}, 40 ${randY()}, 50 ${randY()} 
      S 70 ${randY()}, 100 ${endY}
    `;

    const fillPathStr = `${linePathStr} V 50 H 0 Z`;

    return { linePath: linePathStr, fillPath: fillPathStr, startY, endY };
  }, []);

  return (
    <svg
      viewBox="0 0 100 50"
      preserveAspectRatio="none"
      width={width}
      height={height}
      className="block"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={fillPath} fill={`url(#${gradientId})`} />

      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default FullWidthGraph;