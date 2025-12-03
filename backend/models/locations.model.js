import mongoose from "mongoose";

const weatherConditionSchema = new mongoose.Schema({
  id: Number,
  main: String,
  description: String,
  icon: String
}, { _id: false });

const pollutantSchema = new mongoose.Schema({
  name: String,
  value: Number,
  unit: String
}, { _id: false });

const hourlyAirQualitySchema = new mongoose.Schema({
  time: String,
  aqi: Number
}, { _id: false });

const locationWeatherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    locationId: {
      type: Number,
      required: true,
      alias: 'id'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    region: {
      type: String,
      trim: true
    },
    coordinates: {
      lon: { type: Number, required: true },
      lat: { type: Number, required: true }
    },

    uvi: {
      uv: Number,
      uv_max: Number,
      uv_max_time: Date,
      ozone: Number,
      st1: { type: Number, default: null },
      sun_info: {
        sunrise: Date,
        sunset: Date
      }
    },

    weather: {
      weather: [weatherConditionSchema],
      main: {
        temp: Number,
        feels_like: Number,
        temp_min: Number,
        temp_max: Number,
        pressure: Number,
        humidity: Number
      },
      visibility: Number,
      wind: {
        speed: Number,
        deg: Number,
        gust: Number
      },
      clouds: {
        all: Number
      }
    },

    airQuality: {
      utc_offset_seconds: Number,
      timezone: String,
      timezone_abbreviation: String,
      elevation: Number,
      hourly: {
        date: String,
        forecast: [hourlyAirQualitySchema]
      },
      current: {
        aqi: {
          value: Number,
          unit: String
        },
        pollutantLevels: [pollutantSchema]
      }
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true }, // Ensure alias 'id' works when converting to JSON
    toObject: { virtuals: true }
  }
);

locationWeatherSchema.index({ "coordinates.lon": 1, "coordinates.lat": 1 });

const LocationWeather = mongoose.model("LocationWeather", locationWeatherSchema);

export default LocationWeather;