import NodeCache from "node-cache";
import { fetchCityDataById, fetchCityDataByIP, fetchSuggestions } from '../services/city.services.js';
import { generateContent } from '../services/gemini.service.js';
import { saveOrUpdateWeather } from '../utils/models.util.js';
import { getUserId } from '../utils/auth.utils.js';

const cityCache = new NodeCache({ stdTTL: 3600 });

export const getCitySuggestions = async (req, res) => {
  const query = req.query.q;
  console.log(query);

  if (!query) return res.status(400).json({ error: "Query is required!" });

  const cached = cityCache.get(query);
  if (cached) return res.json(cached);

  try {
    const response = await fetchSuggestions(query);

    const suggestions = response.map(city => ({
      id: city.id,
      name: `${city.name}, ${city.country}`,
    }));

    // Store in cache
    if (Array.isArray(suggestions)) {
      cityCache.set(query, suggestions);
    }

    return res.json(suggestions);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Failed to fetch city suggestions" });
  }
};

export const getCityById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "City ID is required" });

  const userId = await getUserId(req);

  try {
    // Fetch from database or external API
    const cityData = await fetchCityDataById(id);

    // Update Database if user logged in
    if (userId) {
      console.log(`Saving city ${cityData.name} for user ${userId}`);
      await saveOrUpdateWeather(cityData, userId);
    } else {
      console.warn("User not logged in: Data fetched but NOT saved to DB.");
    }

    res.json(cityData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch city data" });
  }
}

export const getCityByIP = async (req, res) => {

  const userId = await getUserId(req);

  try {
    // // Get client IP from headers / socket
    // let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    // FOR TESTING PURPOSES
    let ip="203.189.186.202";

    const geoData = await fetchCityDataByIP(ip);

    // Update Database if user logged in
    if (userId) {
      await saveOrUpdateWeather(geoData, userId);
    } else {
      console.warn("User not logged in: Data fetched but NOT saved to DB.");
    }

    res.json({
      ip,
      ...geoData
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get IP info" });
  }
}

export const getAiInsightById = async (req, res) => {
  const { id } = req.params;

  try {
    const cityResponse = await fetchCityDataById(id);

    if (!cityResponse) {
      return res.status(404).json({ error: "City not found" });
    }

    const insights = await generateContent(cityResponse);

    return res.status(200).json(insights);
  } catch (err) {
    console.error("AI insight error:", err);
    return res.status(500).json({ error: "Error generating AI insights" });
  }
};

