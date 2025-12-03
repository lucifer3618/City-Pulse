import React from 'react';
import { GaugeComponent } from "react-gauge-component";
import MetricTile from "@/components/dashboard/tabs/Dashboard/AQICard/MetricTile.jsx";
import AirQualityChart from "@/components/dashboard/tabs/Dashboard/AQICard/AirQualityChart.jsx";

const getAQIStatus = (value) => {
  if (!value && value !== 0) return "Loading...";
  if (value <= 50) return "Very Good 😍";
  if (value <= 100) return "Good 🙂";
  if (value <= 150) return "Moderate 😐";
  if (value <= 200) return "Unhealthy 😷";
  if (value <= 300) return "Very Unhealthy 🤒";
  return "Hazardous ☠️";
};

function AqiCard({ airQualityData }) {
  return (
    <div className="flex w-full h-full gap-3 rounded-xl border-[#086e56] border-2 p-3">

        <div className="flex flex-col w-[250px] justify-center">
          <div className="bg-[#dcf5ef] w-fit py-3 px-5 rounded-3xl font-bold">
            {getAQIStatus(airQualityData?.current?.aqi.value)}
          </div>
          <div className="flex flex-col items-center">
            <GaugeComponent
              value={airQualityData?.current?.aqi.value}
              type="radial"
              className="w-[240px] h-[170px]"
              labels={{
                valueLabel: {
                  hide: true,
                },
                tickLabels: {
                  type: "inner",
                  ticks: [
                    { value: 20 },
                    { value: 40 },
                    { value: 60 },
                    { value: 80 },
                    { value: 100 }
                  ],
                }
              }}
              arc={{
                colorArray: ['#5BE12C', '#EA4228'],
                subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
                padding: 0.02,
                width: 0.2,
                cornerRadius: 7
              }}
              pointer={{
                elastic: true,
                animationDelay: 0
              }}
            />
            <p className="text-5xl font-bold text-gray-500">
              {airQualityData?.current?.aqi.value}
            </p>
            <p className="font-bold text-gray-400">AQI</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          {airQualityData?.current?.pollutantLevels.map((item, i) => (
            <div key={i}>
              <MetricTile lable={item.name} current={item.value} current_unit={item.unit} />
            </div>
          ))}
        </div>

        <div className="flex-grow">
          <AirQualityChart dateInfo={airQualityData?.hourly} />
        </div>
    </div>
  );
}

export default AqiCard;