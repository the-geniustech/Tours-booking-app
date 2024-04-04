import { join, resolve } from 'path';
import express, { json, static as statics } from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';

import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

config({ path: './config.env' });

const app = express();
const rootDir = resolve();
const staticFilePath = join(rootDir, 'public');

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(json());
app.use(statics(staticFilePath));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
