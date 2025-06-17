import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from '../config/db.js';
import routes from './routes.js';

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  if (process.env.NODE_ENV !== 'test') {
    connectDB().catch(err => console.error('DB connection error:', err));
  }

  app.use('/api', routes);

  return app;
}

export default createApp;