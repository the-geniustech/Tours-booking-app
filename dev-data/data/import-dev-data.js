import { config } from 'dotenv';
import { readFileSync } from 'fs';
import mongoose from 'mongoose';
import { join, resolve } from 'path';
import Tour from '../../models/tourModel';

config({ path: './config.env' });

const rootDir = resolve();
const toursPath = join(rootDir, 'dev-data', 'data', 'tours-simple.json');

const tours = JSON.parse(readFileSync(toursPath));

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('Database successfully connected'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

switch (process.argv[2]) {
  case '--import':
    importData();
    break;
  case '--delete':
    deleteData();
    break;
  default:
    break;
}
