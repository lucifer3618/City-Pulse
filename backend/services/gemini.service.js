import geminiClient from './api-clients/gemini.client.js';

function extractJsonFromMarkdown(text) {
  const cleaned = text.replace(/```json\s*|```/g, "").trim();
  return cleaned;
}

export async function generateContent(cityData, model = 'gemini-flash-latest') {

  const prompt = `
    You are an AI assistant for a web app called Smart City Health & Pollution Tracker.
    The app shows real-time environmental and health data for a selected city.
    Based on the data provided below, generate 5 short, clear, and user-friendly insights
    for display on a dashboard section titled "Smart City Insights."
    
    Each insight should be in a separate bullet point and explain what the data means for
    air quality, weather comfort, and public health.
    
    Follow these rules carefully:
    1. Keep each insight under 25 words.
    2. Use simple, positive, and informative language suitable for the general public.
    3. Include action-oriented advice when relevant (e.g., "avoid outdoor exercise", "stay hydrated").
    4. Mention the overall livability condition at the end with a score from 0–100.
    5. Do not include word count at the end.
    6. Respond only in JSON with this structure:
    
    {
      "city": "City Name",
      "insights": [
        { "category": "Air Quality", "message": "..." },
        { "category": "Weather", "message": "..." },
        { "category": "Health", "message": "..." },
        { "category": "Environment", "message": "..." },
        { "category": "Overall", "message": "..." }
      ]
    }
    
    Here is the city data:
      ${JSON.stringify(cityData, null, 2)}`;

  try {
    const endpoint = `/${model}:generateContent`;

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const response = await geminiClient.post(endpoint, payload);

    const candidate = response.data?.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;
    const jsonText = extractJsonFromMarkdown(text);
    const parsed = JSON.parse(jsonText);
    return parsed || null;


  } catch (error) {
    console.error("Error communicating with Gemini API:", error.response?.data || error.message);
    return null;
  }
}