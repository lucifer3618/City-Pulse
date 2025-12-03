import React from 'react';
import { Sun, Info, ArrowUp, Timer, CloudFog, Sunrise, Sunset } from 'lucide-react';

const UVIndexCard = ({
                       uv = 0.226,
                       uv_max = 9.89,
                       uv_max_time = "2025-11-29T06:30:17.960Z",
                       ozone = 277.6,
                       safe_exposure_time = 737 ,
                       // NEW PROPS for added content
                       sunrise,
                       sunset
                     }) => {
  const scaleMax = 11;

  const parseNum = (val) => (typeof val === 'number' && !Number.isNaN(val)) ? val : (val ? Number(val) : null);
  const currentUV = parseNum(uv);
  const maxUV = parseNum(uv_max);
  const ozoneLevel = parseNum(ozone);
  const safeIndex = currentUV !== null ? Math.min(Math.round(currentUV), scaleMax) : null;

  const formatTimeSimple = (isoString) => {
    if (!isoString) return '--:--';
    try {
      return new Date(isoString).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } catch (e) { return '--:--'; }
  };

  const formatDuration = (minutes) => {
    if (!minutes) return 'Unlimited';
    if (minutes > 720) return 'Unlimited';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins} mins`;
  };

  const burnTimeText = formatDuration(safe_exposure_time);

  const uvIndexGuidelines = {
    "0": { desc: "Low", advice: "No protection needed." },
    "1": { desc: "Low", advice: "No protection needed." },
    "2": { desc: "Low", advice: "Minimal protection required." },
    "3": { desc: "Moderate", advice: "Stay in shade near midday." },
    "4": { desc: "Moderate", advice: "Wear sunscreen and a hat." },
    "5": { desc: "Moderate", advice: "Use sun protection until 4PM." },
    "6": { desc: "High", advice: "Reduce time in the sun." },
    "7": { desc: "High", advice: "Cover up, wear hat & SPF 30+." },
    "8": { desc: "Very High", advice: "Extra precautions needed." },
    "9": { desc: "Very High", advice: "Seek shade immediately." },
    "10": { desc: "Very High", advice: "Avoid midday sun." },
    "11": { desc: "Extreme", advice: "Unprotected skin burns instantly." }
  };
  const currentGuide = safeIndex !== null ? uvIndexGuidelines[String(safeIndex)] : { desc: '—', advice: 'No data' };

  const indicatorPosition = currentUV !== null ? Math.min((currentUV / scaleMax) * 100, 100) : 0;
  const maxIndicatorPosition = maxUV !== null ? Math.min((maxUV / scaleMax) * 100, 100) : 0;

  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#0a594b] to-[#001a10] text-white rounded-2xl p-6 py-4 shadow-xl w-full flex flex-col justify-between border border-white/10 font-sans">

      <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url(/uv_bg.png)` }}></div>

      <div className="relative flex justify-between items-start">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-full backdrop-blur-md shadow-inner">
              <Sun className="h-6 w-6 text-yellow-300" />
            </div>
            <h2 className="text-xl font-bold tracking-wide text-white/90">UV INDEX</h2>
          </div>
          {ozoneLevel && (
            <div className="flex items-center space-x-2 pl-12 opacity-70">
              <CloudFog className="h-3 w-3" />
              <span className="text-xs font-medium tracking-wider">OZONE: {ozoneLevel} DU</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end bg-white/5 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
          <span className="text-[12px] uppercase font-bold text-white/60 tracking-wider mb-1">Daily Max</span>
          <div className="flex items-center space-x-1.5 text-yellow-300">
            <ArrowUp className="h-4 w-4" />
            <span className="text-3xl font-bold leading-none">{maxUV !== null ? maxUV.toFixed(1) : '—'}</span>
          </div>
          <span className="text-[12px] text-white/50 mt-1 font-medium">at {formatTimeSimple(uv_max_time)}</span>
        </div>
      </div>

      <div className="flex flex-row items-end justify-between h-[100px] w-full relative z-10 space-x-6">

        <div className="flex flex-col flex-shrink-0 w-48">
          <span className="text-8xl font-bold tracking-tighter leading-none text-white drop-shadow-xl">
            {currentUV !== null ? currentUV.toFixed(1) : '—'}
          </span>
          <span className="text-3xl font-medium text-emerald-300 mt-2 pl-1">
            {currentGuide.desc}
          </span>
        </div>

        <div className="flex flex-1 items-end space-x-4 h-full">

          <div className="flex flex-1 items-start space-x-3 bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm h-24">
            <Info className="h-6 w-6 text-emerald-300 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider mb-1">Guideline</span>
              <p className="text-sm font-medium text-white/90 leading-snug">{currentGuide.advice}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-emerald-900/40 p-4 rounded-2xl border border-emerald-500/20 backdrop-blur-sm h-24 w-40">
            <div className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-emerald-300" />
              <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wide">Safe Time</span>
            </div>
            <span className="text-2xl font-bold text-white truncate">{burnTimeText}</span>
          </div>

          <div className="flex flex-col justify-between bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm h-24 w-48">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-wide mb-2">Sun Cycle</span>
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <div className="flex items-center space-x-1 text-yellow-200/70 mb-0.5">
                  <Sunrise className="h-4 w-4" />
                  <span className="text-[10px]">Rise</span>
                </div>
                <span className="text-sm font-bold">{formatTimeSimple(sunrise)}</span>
              </div>
              <div className="h-8 w-px bg-white/10 mx-2"></div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-1 text-orange-300/70 mb-0.5">
                  <Sunset className="h-4 w-4" />
                  <span className="text-[10px]">Set</span>
                </div>
                <span className="text-sm font-bold">{formatTimeSimple(sunset)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="relative mb-2">
        <div className="flex justify-between text-[10px] mb-3 text-white/50 font-bold uppercase tracking-widest">
          <span>Low</span>
          <span>Extreme</span>
        </div>
        <div className="relative h-3 bg-black/40 rounded-full overflow-visible">
          <div className="absolute top-0 left-0 h-full w-full rounded-full opacity-90" style={{ background: 'linear-gradient(90deg, #4ade80 0%, #eab308 50%, #ef4444 100%)' }}></div>
          <div className="absolute top-1/2 -translate-y-1/2 h-6 w-6 bg-white rounded-full border-[3px] border-[#0a594b] shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center transition-all duration-500 ease-out" style={{ left: `calc(${indicatorPosition}% - 12px)` }}>
            <div className="w-1.5 h-1.5 bg-[#0a594b] rounded-full"></div>
          </div>
          <div className="absolute top-0 h-full w-0.5 bg-white/80 z-10" style={{ left: `${maxIndicatorPosition}%` }}>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-white/70 font-bold tracking-widest">MAX</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UVIndexCard;