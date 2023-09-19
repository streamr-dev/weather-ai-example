import StreamrClient from 'streamr-client';
import { WEATHER_STREAM_ID } from './config';
import { WeatherDataPoint } from './interfaces';
import { computeAverages, generateWeatherReport } from './helper';

/* 
Example Weather Data Point:
{
    temperature: 27.56,
    humidity: 46.39,
    airQualityIndex: 16,
    noiseLevel: 66.45
} 

Example Weather Average Data Point:
{
  avgTemperature: 26.939166666666658,
  avgHumidity: 66.64150000000001,
  avgAQI: 68.88333333333334,
  avgNoise: 59.78016666666665
}
*/

export const startSubscriberService = () => {
  const streamr = new StreamrClient({
    auth: {
      privateKey: process.env.PRIVATE_KEY || '',
    },
  });

  let dataBuffer: WeatherDataPoint[] = [];

  streamr.subscribe(WEATHER_STREAM_ID, (message) => {
    const weatherData = message as WeatherDataPoint;
    // Store the incoming message in the data buffer
    dataBuffer.push(weatherData);
    console.log(dataBuffer.length);

    // Check if the buffer has 60 data points
    if (dataBuffer.length === 60) {
      // Calculating the averages for ai model
      const weatherAverages = computeAverages(dataBuffer);

      generateWeatherReport(weatherAverages);

      // Clear the buffer for the next set of 60 data points
      dataBuffer = [];
    }
  });
};
