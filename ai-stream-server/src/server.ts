import express from 'express';
import dotenv from 'dotenv';
import { startSubscriberService } from './subscriber-service';

dotenv.config();

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

startSubscriberService();
