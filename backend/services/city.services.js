import openWeatherClient from './api-clients/openweather.client.js';
import openmeteoClient from './api-clients/openmeteo.client.js';
import geoDBClient from './api-clients/geodb.client.js';
import ipAPIClient from './api-clients/ipapi.client.js';
import { filterCityData,} from '../utils/city.util.js';
import openUVClient from './api-clients/openUV.client.js';
import { saveOrUpdateWeather } from '../utils/models.util.js';

// Helper functions
const fetchCityData = async (city) => {
  if (!city) throw new Error("City not found");

  const cityName = city.name;
  const latitude = city.latitude;
  const longitude = city.longitude;

  try{
    const [weatherRes, airRes, uvRes] = await Promise.all([
      openWeatherClient.get("/2.5/weather", { params: {
          lat: latitude,
          lon: longitude,
        } }),
      openmeteoClient.get("/air-quality", { params: {
          "latitude" : latitude,
          "longitude" : longitude,
          "current" : "us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide",
          "hourly": "us_aqi",
          "timezone": "auto",
        } }),
      openUVClient.get("/uv", {
        params: {
          lat: latitude,
          lng: longitude,
        }
      }),
    ]);

    const aggregatedData = filterCityData(city, weatherRes, airRes, uvRes);

    return aggregatedData;

  } catch (err) {
    console.log("Error retrieving data from APIs: ", err.message);
  }
}

export const fetchSuggestions = async (query) => {
  try {
    const suggestions = await geoDBClient.get("/places", {
      params: {
        namePrefix: query,
        type: "CITY",
        limit: 10,
        sort: "-population"
      }
    });
    console.log(suggestions.data.data);

    return suggestions.data.data;

  } catch (e) {
    return e.message;
  }
}

export const fetchCityDataById = async (id) => {

  try {
    const cityResponse = await geoDBClient.get(`/cities/${id}`);
    const city = cityResponse.data.data;

    return await fetchCityData(city);

  } catch (error) {
      return error.message;
  }
};

export const fetchCityDataByIP = async (ip) => {
  try {
    // Get location info from IP
    const geoRes = await ipAPIClient.get(`/json/${ip}`);
    const geoData = geoRes.data;

    const latStr = geoData.lat >= 0 ? `+${geoData.lat}` : `${geoData.lat}`;
    const lonStr = geoData.lon >= 0 ? `+${geoData.lon}` : `${geoData.lon}`;


    const cityData = await geoDBClient.get(`/locations/${latStr}${lonStr}/nearbyCities`, {
      params: {
        limit: 1,
      }
    });

    // Fix city, country name issue by substituting it with IP API city, country name
    cityData.data.data[0].name = geoData.city;
    cityData.data.data[0].country = geoData.country;

    console.log("City Data", cityData.data.data[0]);

    let aggrigatedData = await fetchCityData(cityData.data.data[0]);

    return aggrigatedData;

  } catch (err) {
    console.log("Error from fetchCityById: " + err);
  }
}