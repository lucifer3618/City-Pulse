import { useState } from "react";
import { cn } from "@/lib/utils.js";

export const UnitToggle = ({ defaultUnit = "C", className, handleChange }) => {
  const savedState = localStorage.getItem("toggleState");

  const [unit, setUnit] = useState(savedState || defaultUnit);

  const handleToggle = () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);
    handleChange(newUnit);
    localStorage.setItem("toggleState", newUnit);
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "relative inline-flex items-center rounded-full transition-all duration-300",
        "bg-[hsl(164_70%_40%)] hover:bg-[hsl(164_70%_35%)]",
        "shadow-lg shadow-[hsl(164_70%_25%)]/30",
        "focus:outline-none  ",
        "w-19 h-10 px-3",
        className
      )}
      aria-label={`Temperature unit: ${unit === "C" ? "Celsius" : "Fahrenheit"}`}
      role="switch"
      aria-checked={unit === "F"}
    >
      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <span
          className={cn(
            "text-sm font-semibold transition-all duration-300",
            unit === "C"
              ? "text-[hsl(164_70%_40%)] opacity-0"
              : "text-[hsl(0_0%_100%)] opacity-100"
          )}
        >
          C
        </span>
        <span
          className={cn(
            "text-sm font-semibold transition-all duration-300",
            unit === "F"
              ? "text-[hsl(164_70%_40%)] opacity-0"
              : "text-[hsl(0_0%_100%)] opacity-100"
          )}
        >
          F
        </span>
      </div>

      {/* Sliding Knob */}
      <div
        className={cn(
          "relative z-10 flex items-center justify-center",
          "w-6 h-6 rounded-full",
          "bg-[hsl(0_0%_100%)]",
          "shadow-md",
          "transition-all duration-500 ease-out",
          "transform",
          unit === "F" && "translate-x-[2rem]"
        )}
      >
        <span className="text-sm font-bold text-[hsl(164_70%_40%)]">
          {unit}
        </span>
      </div>
    </button>
  );
};
