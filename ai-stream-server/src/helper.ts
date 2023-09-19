import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { WeatherAverages, WeatherDataPoint } from './interfaces';
import OpenAI from 'openai';
import StreamrClient from 'streamr-client';
import { WEATHER_REPORT_ID } from './config';

// Function to compute average values from an array of data points
export const computeAverages = (data: WeatherDataPoint[]): WeatherAverages => {
  const totalPoints = data.length;
  return {
    avgTemperature:
      data.reduce((acc, point) => acc + point.temperature, 0) / totalPoints,
    avgHumidity:
      data.reduce((acc, point) => acc + point.humidity, 0) / totalPoints,
    avgAQI:
      data.reduce((acc, point) => acc + point.airQualityIndex, 0) / totalPoints,
    avgNoise:
      data.reduce((acc, point) => acc + point.noiseLevel, 0) / totalPoints,
  };
};

// Using chat-gpt to generate a weather report
export const generateAndPublishWeatherReport = async (
  data: WeatherAverages
) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log('Processing 60 data points:', data);

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `You're a digital meteorologist for an online platform. Every hour, you receive an average reading based on minute-by-minute data. You then craft a concise report on the weather conditions. Try including a joke`,
    },
    {
      role: 'user',
      content: 'Weather averages for the last hour:\n' + JSON.stringify(data),
    },
  ];

  const openAIResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 0.7,
    max_tokens: 1000,
  });

  const weatherReport = openAIResponse.choices[0].message?.content;

  if (!weatherReport) {
    return;
  }

  const streamr = new StreamrClient({
    auth: {
      privateKey: process.env.PRIVATE_KEY || '',
    },
  });
  streamr.publish(WEATHER_REPORT_ID, { weatherReport: weatherReport });
  console.log(weatherReport);
};
