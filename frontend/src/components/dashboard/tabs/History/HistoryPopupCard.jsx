const WeatherPopupCard = ({ name, temp, feelsLike, condition, windSpeed, humidity }) => {

  const accentColor = "#065a46";

  return (
    <div className="relative w-[210px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] p-3 overflow-hidden font-sans">

      <div
        className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-10"
        style={{ backgroundColor: accentColor }}
      ></div>

      <div className="flex justify-between items-baseline mb-2 z-10 relative">
        <h3 className="font-bold text-gray-800 text-sm truncate max-w-[120px]">{name}</h3>
        <span className="text-[13px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>
          {condition.main}
        </span>
      </div>

      <div className="flex items-end justify-between">

        <div className="flex flex-col">
          <span className="text-4xl font-extrabold text-gray-800 leading-none tracking-tight">
            {temp.toFixed(1)}°
          </span>
          <span className="text-[10px] text-gray-400 font-medium mt-1">
            Real Feel {feelsLike}°
          </span>
        </div>

        <div className="flex flex-col gap-1.5">

          <div className="flex items-center justify-between bg-slate-50 rounded-md px-2 py-1 w-[85px] border border-slate-100">
            <span className="text-xs font-bold text-slate-700">{windSpeed.toFixed(1)} <span className="text-[9px] font-normal text-slate-400">km/h</span></span>
            {/* Wind Icon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>
          </div>

          <div className="flex items-center justify-between bg-slate-50 rounded-md px-2 py-1 w-[85px] border border-slate-100">
            <span className="text-xs font-bold text-slate-700">{humidity}%</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-5-9-5-9S9 13 9 15a7 7 0 0 0 7 7z"/></svg>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WeatherPopupCard;