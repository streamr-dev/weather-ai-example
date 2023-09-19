import { WeatherDataPoint } from './interfaces';

// Note that these ranges wouldn't make sense in a real world. The temperature wouldn't be 15 degrees in one minute and then switch to 35 in the next at random
const TEMPERATURE_RANGE = [15, 35]; // Celsius
const HUMIDITY_RANGE = [40, 90]; // Percentage
const AQI_RANGE = [0, 150]; // Air Quality Index
const NOISE_LEVEL_RANGE = [40, 80]; // Decibels

// Function to generate a single data point
export function generateDataPoint(): WeatherDataPoint {
  return {
    temperature: +(
      Math.random() * (TEMPERATURE_RANGE[1] - TEMPERATURE_RANGE[0]) +
      TEMPERATURE_RANGE[0]
    ).toFixed(2),
    humidity: +(
      Math.random() * (HUMIDITY_RANGE[1] - HUMIDITY_RANGE[0]) +
      HUMIDITY_RANGE[0]
    ).toFixed(2),
    airQualityIndex: Math.floor(
      Math.random() * (AQI_RANGE[1] - AQI_RANGE[0]) + AQI_RANGE[0]
    ),
    noiseLevel: +(
      Math.random() * (NOISE_LEVEL_RANGE[1] - NOISE_LEVEL_RANGE[0]) +
      NOISE_LEVEL_RANGE[0]
    ).toFixed(2),
  };
}
