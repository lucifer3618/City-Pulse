import React, {useState} from 'react'
import {MapPin} from "lucide-react";
import {UnitToggle} from "@/components/dashboard/tabs/Dashboard/WeatherCard/UnitToggle.jsx";

function WeatherCard({ className, currentTemp, feelsLike, highestTemp, lowestTemp, location, weather }) {
  console.log(weather)

  const savedState = localStorage.getItem("toggleState");

  const [unit, setUnit] = useState(savedState);

  const changeUnite = (value) => {
    if (unit === "F") {
      return ((value * 9/5) + 32);
    }
    return value;
  }

  const getImageByWeather = (condition) => {

    const weatherImages = {
      'Clear': '/weather_icons/sunny.png',
      'Clouds': '/weather_icons/cloudy.png',
      'Rain': '/weather_icons/rain.png',
      'Thunderstorm': '/weather_icons/thunder.png',
      'Snow': '/weather_icons/snow.png',
      'Drizzle': '/weather_icons/drizzel.png',
      'Atmosphere': '/weather_icons/atmosphere.png',
      'Mist': '/weather_icons/mist.png',
      'Extreme': '/weather_icons/tornado.png'
    };

    return weatherImages[condition] || '/weather_icons/cloudy.png';
  };

  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden text-white shadow-lg ${className}`}>
      {/* Background image */}
      <img
        src="/weather-card-bg.png"
        alt="Weather background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="flex gap-1 justify-center items-center p-3 px-4 rounded-4xl bg-black">
              <MapPin className="size-5" />
              <span className="text-lg font-medium">{location}</span>
            </div>
          </div>

          <UnitToggle handleChange={setUnit} />

        </div>

        {/* Weather Info */}
        <div className="mt-6">


          <div className="flex h-full justify-between items-center">
            <div>
              <h2 className="text-lg text-gray-300">Weather</h2>
              <p className="text-sm text-gray-400 mb-3">Now</p>
              <div>
                <h1 className="text-6xl font-semibold">{changeUnite(currentTemp) +` °${unit}`}</h1>
                <p className="text-sm text-gray-400 mt-1">Feels like {changeUnite(feelsLike)}°</p>
              </div>
            </div>

            {/* Weather Icon */}
            <div className="flex flex-col h-full justify-between items-end relative">
              <div className="">
                <img src={getImageByWeather(weather)} alt="" className="w-[150px]" />
              </div>
              {/* High / Low */}
              <div className="mt-4 flex justify-end text-sm text-gray-300 space-x-4">
                <p>High: {changeUnite(highestTemp)}°</p>
                <p>Low: {changeUnite(lowestTemp)}°</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
