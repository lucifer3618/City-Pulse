import React from "react";
import MapCard from "@/components/dashboard/tabs/Dashboard/MapCard.jsx";
import WeatherCard from "@/components/dashboard/tabs/Dashboard/WeatherCard/WeatherCard.jsx";
import InsightCard from "@/components/dashboard/tabs/Dashboard/InsightCard.jsx";
import AQICard from "@/components/dashboard/tabs/Dashboard/AQICard/AQICard.jsx";
import WindIndicator from "@/components/dashboard/tabs/Dashboard/WindIndicator/WindIndicator.jsx";
import AdditionalInfoCard from "@/components/dashboard/tabs/Dashboard/AdditionalInfoCard.jsx";
import {LucideDroplets, LucideGauge} from "lucide-react";
import UVIndexCard from "@/components/dashboard/tabs/Dashboard/UVIndexCard.jsx";

function DashboardTab({ cityData }) {
  return (
    <div className="grid grid-cols-12 gap-6 p-6 auto-rows-[320px]">

      <div className="col-span-4">
        <WeatherCard
          className="relative h-full"
          location={`${cityData?.geoData?.name || cityData?.name}, ${cityData?.geoData?.country || cityData?.country }`}
          currentTemp={Math.round(cityData?.weather?.main?.temp)}
          feelsLike={Math.round(cityData?.weather?.main?.feels_like)}
          highestTemp={Math.round(cityData?.weather?.main?.temp_max)}
          lowestTemp={Math.round(cityData?.weather?.main?.temp_min)}
          weather={cityData?.weather?.weather[0].main}
        />
      </div>

      <div className="col-span-4 overflow-hidden rounded-2xl h-full">
        <MapCard
          className="rounded-2xl relative !z-0 h-full"
          lat={cityData?.airQuality?.latitude || 6.9271}
          lon={cityData?.airQuality?.longitude || 79.8612}
          pinName={`${cityData?.name}, ${cityData?.country}`}
        />
      </div>

      <div className="col-span-4 grid grid-cols-2  gap-4 h-full">
        <div className="rounded-xl bg-gray-700 h-full">
          <WindIndicator direction={cityData?.weather?.wind?.deg} speed={cityData?.weather?.wind?.speed} />
        </div>
        <div className="grid grid-rows-3 gap-2 h-full">
          <div className="rounded-xlh-full">
            <AdditionalInfoCard
              label="Humidity"
              value={cityData?.weather?.main.humidity}
              unit="Precent"
              Icon={LucideDroplets}
              color="#3B82F6"
            />
          </div>
          <div className="rounded-xl h-full">
            <AdditionalInfoCard
              label="Air Pressure"
              value={cityData?.weather?.main.pressure}
              unit="Pascal"
              Icon={LucideGauge}
              color="#68bd88"
            />
          </div>
          <div className="rounded-xl h-full">
            <AdditionalInfoCard
              label="Cloudiness"
              value={cityData?.weather?.clouds?.all}
              unit="Precent"
              Icon={LucideDroplets}
              color="#f59f3d"
            />
          </div>
        </div>
      </div>

      <div className="col-span-8 rounded-xl flex items-center justify-center h-full">
        <AQICard airQualityData={cityData?.airQuality} />
      </div>

      <div className="col-span-4 row-span-2 rounded-xl flex items-center justify-center">
        <InsightCard cityId={cityData?.id} />
      </div>


      <div className="col-span-8 rounded-xl bg-gray-800 flex items-center justify-center h-full">
        <UVIndexCard
          uv={cityData?.uvi?.uv}
          uv_max={cityData?.uvi?.uv_max}
          uv_max_time={cityData?.uvi?.uv_max_time}
          ozone={cityData?.uvi?.ozone}
          safe_exposure_time={cityData?.uvi?.st1}
          sunrise={cityData?.uvi?.sun_info.sunrise}
          sunset={cityData?.uvi?.sun_info.sunset}
        />
      </div>

    </div>
  );
}

export default DashboardTab;