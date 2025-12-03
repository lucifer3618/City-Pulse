import LocationWeather from '../models/locations.model.js';

export const saveOrUpdateWeather = async (data, userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required to save weather data.");
    }

    const filter = {
      locationId: data.id,
      user: userId
    };

    const updatePayload = {
      ...data,
      user: userId
    };

    const result = await LocationWeather.findOneAndUpdate(
      filter,
      updatePayload,
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        runValidators: true
      }
    );

    return result;

  } catch (error) {
    console.error(`[DB Error] Failed to save weather for user ${userId}:`, error.message);
    throw error;
  }
};