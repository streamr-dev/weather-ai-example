import StreamrClient from 'streamr-client';
import { generateDataPoint } from './helper';
import { WEATHER_STREAM_ID } from './config';

/* 
Example Data Point:
{
    temperature: 27.56,
    humidity: 46.39,
    airQualityIndex: 16,
    noiseLevel: 66.45
} 
*/

export const startPublisherService = () => {
  const streamr: StreamrClient = new StreamrClient({
    auth: {
      privateKey: process.env.PRIVATE_KEY || '',
    },
  });

  // We prentend that 1 sec equals 1 min in this example
  setInterval(async () => {
    const dataPoint = generateDataPoint();
    await streamr.publish(WEATHER_STREAM_ID, dataPoint);
    console.log('published:', dataPoint);
  }, 1000);
};
