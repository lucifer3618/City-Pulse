import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';

const getAQIColor = (value) => {
  if (value <= 50) return "#22c55e"; // Green (Good)
  if (value <= 100) return "#eab308"; // Yellow (Moderate)
  if (value <= 150) return "#f97316"; // Orange (Unhealthy for Sensitive)
  if (value <= 200) return "#ef4444"; // Red (Unhealthy)
  if (value <= 300) return "#a855f7"; // Purple (Very Unhealthy)
  return "#7f1d1d"; // Maroon (Hazardous)
};

const CustomTooltip = ({ active, payload, label, date }) => {
  if (active && payload && payload.length) {

    const currentAqi = payload[0].value;

    const statusColor = getAQIColor(currentAqi);

    const gaugeProgress = Math.min(currentAqi, 100);

    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4">
        <div>
          <p className="text-xl font-bold text-gray-800">{label}</p>
          <p className="text-xs text-gray-500 font-medium">{date}</p>
        </div>

        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <path
              className="text-gray-100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              strokeDasharray={`${gaugeProgress}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={statusColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full">
            <span className="text-sm font-bold text-[]" style={{ color: statusColor }}>{currentAqi}</span>
            <span className="text-[8px] text-gray-400 leading-none">AQI</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const AirQualityChart = ({dateInfo}) => {
  return (
    <div className="flex flex-col p-4 pr-0 pl-6">
      <div className="font-bold text-2xl">Air Quality Forecast</div>
      <div className="w-full h-58 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dateInfo?.forecast}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              {/* This is the "Secret Sauce":
              We define a Pattern that repeats small circles to create the dotted fill.
            */}
              <pattern
                id="dotPattern"
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(0)"
              >
                <circle cx="2" cy="2" r="1.5" fill="#86efac" fillOpacity="1" />
              </pattern>
            </defs>

            <CartesianGrid
              vertical={true}
              horizontal={false}
              stroke="#f0f0f0"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />

            <Tooltip
              content={<CustomTooltip date={dateInfo?.date} />}
              cursor={{ stroke: '#22c55e', strokeWidth: 1, strokeDasharray: '5 5' }}
              defaultIndex={9} // Forces the tooltip to show initially on specific index
            />

            {/* The Main Area Curve */}
            <Area
              type="monotone"
              dataKey="aqi"
              stroke="#086e56"
              strokeWidth={4}
              fill="url(#dotPattern)"
              activeDot={{
                r: 8,
                fill: '#10b981',
                stroke: 'white', // White border
                strokeWidth: 4
              }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AirQualityChart;