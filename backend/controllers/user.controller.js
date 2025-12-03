import User from '../models/user.model.js';
import LocationWeather from '../models/locations.model.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      const error = new Error('User not found!');
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export const getCityHistoryById = async (req, res, next) => {

  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      const error = new Error('User not found!');
      error.status = 404;
      throw error;
    }

    const history = await LocationWeather.find({ user: userId })
      .sort({ updatedAt: -1 })
      .select("name country region coordinates weather.main weather.weather weather.wind updatedAt");

    console.log("Fetched");

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });

  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve history" });
  }
}