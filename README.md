# **AI & Weather Stream Servers Installation & Configuration Guide**

# **1. Context**

## **Overview**

This service consists of two servers designed to publish data to distinct data streams/topics:

1. **Weather Stream**: Contains individual weather data points.
2. **AI Stream**: Houses weather reports, generated through the OpenAI API using a Learning Language Model (LLM). These reports are based on averaged values derived from the data points of the weather stream.

## **Server Responsibilities**

- **weather-stream-server**:

  - Publishes mock weather data at one-second intervals.

- **ai-stream-server**:
  - Aggregates the last 60 weather data points.
  - Calculates averages based on these data points.
  - Sends a request to OpenAI to obtain a corresponding weather report.
  - Publishes the generated weather report to the AI stream.

## **Data Structure Examples**

### **Weather Data Point**:

```json
{
  "temperature": 27.56,
  "humidity": 46.39,
  "airQualityIndex": 16,
  "noiseLevel": 66.45
}
```

### **Averaged Weather Data Point**:

```json
{
  "avgTemperature": 26.939166666666658,
  "avgHumidity": 66.64150000000001,
  "avgAQI": 68.88333333333334,
  "avgNoise": 59.78016666666665
}
```

## **2. Installation**

### **AI Stream Server**:

```bash
cd ai-stream-server
npm install
```

### **Weather Stream Server**:

```bash
cd weather-stream-server
npm install
```

## **2. Environment Configuration**

For both `ai-stream-server` and `weather-stream-server`:

1. Create a `.env` file.
2. Add the `PRIVATE_KEY` environment variable.

## **3. Stream Configuration**

Both servers come with a configuration file with predefined stream IDs. If you use the given wallet address, you won't have permissions to publish data to these streams/topics.

To configure your stream:

1. Create a new topic with the hub. Follow this tutorial for guidance:
   [How to Create a Topic with the Hub](https://www.loom.com/share/6f06b3b19b1a4787a7807853793b3834?sid=0f08e218-f932-4c35-838c-6ed212462636).

2. Make sure to create the stream using the same wallet address from which you obtained your private key. This ensures you have the right permissions. Alternatively, you can assign permissions to another address via the Hub's user interface.

3. You'll need to establish two streams:
   - One for weather mock data.
   - Another for the weather report data.

## **4. Starting the Servers**

Open two separate terminals (preferably bash) and execute:

```bash
npm run start
```
