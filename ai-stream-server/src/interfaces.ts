export interface WeatherDataPoint {
  temperature: number;
  humidity: number;
  airQualityIndex: number;
  noiseLevel: number;
}

export interface WeatherAverages {
  avgTemperature: number;
  avgHumidity: number;
  avgAQI: number;
  avgNoise: number;
}
