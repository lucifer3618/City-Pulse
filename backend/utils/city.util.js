export const getEvery3rdAQIForCurrentDay = (airQualityData) => {
  const rawHourly = airQualityData.hourly;

  // FIX: Use local time to determine "today"
  const todayString = new Date().toLocaleDateString('en-CA');

  let hourlyForecast = rawHourly.time
    .map((time, index) => ({
      time: time,
      aqi: rawHourly.us_aqi[index]
    }))
    .filter(item => {
      // 1. Filter logic (keep full string here for checking date)
      const isToday = item.time.startsWith(todayString);
      const hour = parseInt(item.time.split('T')[1].split(':')[0], 10);
      return isToday && (hour % 3 === 0);
    })
    .map(item => ({
      // 2. Transform logic (Extract only the time part)
      // "2025-11-28T03:00" -> "03:00"
      time: item.time.split('T')[1],
      aqi: item.aqi
    }));

  return {
    ...airQualityData,
    hourly: {
      date: todayString,
      forecast: hourlyForecast
    }
  }
}

export const filterCityData = (city, weatherRes, airRes, uvRes) => {

  let airQualityData = airRes.data;
  console.log("City----: ", city);

  const countryName = weatherRes.data.sys.country;
  const coordinates = weatherRes.data.coord;
  const current = {
    aqi: {
      value: airQualityData.current.us_aqi,
      unit : airQualityData.current_units.us_aqi,
    },
    pollutantLevels  : [
      {
        name: "PM 2.5",
        value: airQualityData.current.pm2_5,
        unit: airQualityData.current_units.pm2_5
      },
        {
          name: "PM 10",
          value: airQualityData.current.pm10,
          unit: airQualityData.current_units.pm10
        },
        {
          name: "NO2",
          value: airQualityData.current.nitrogen_dioxide,
          unit: airQualityData.current_units.nitrogen_dioxide
        },
      ]
  }


  delete city.population;
  delete weatherRes.data.dt;
  delete weatherRes.data.sys;
  delete weatherRes.data.timezone;
  delete weatherRes.data.id;
  delete weatherRes.data.name;
  delete weatherRes.data.cod;
  delete weatherRes.data.base;
  delete weatherRes.data.main.sea_level;
  delete weatherRes.data.main.grnd_level;
  delete weatherRes.data.coord;
  delete airRes.data.current;
  delete airRes.data.current_units;
  delete airRes.data.hourly_units;
  delete airRes.data.latitude;
  delete airRes.data.longitude;
  delete airRes.data.generationtime_ms;


  airQualityData = {
    ...airQualityData,
    current
  }

  return  {
    id: city.id,
    name: city.name,
    country: countryName,
    region: city.region,
    coordinates : coordinates,
    uvi: {
      uv: uvRes.data.result.uv,
      uv_max: uvRes.data.result.uv_max,
      uv_max_time: uvRes.data.result.uv_max_time,
      ozone: uvRes.data.result.ozone,
      st1: uvRes.data.result.safe_exposure_time.st1,
      sun_info: {
        sunrise: uvRes.data.result.sun_info.sun_times.sunrise,
        sunset: uvRes.data.result.sun_info.sun_times.sunset,
      }
    },
    weather: weatherRes.data,
    airQuality: getEvery3rdAQIForCurrentDay(airQualityData)}
}