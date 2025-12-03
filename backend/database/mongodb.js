import mongoose from 'mongoose';

import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI) {
  throw new Error('MongoDB URI is missing!, please configure it under .env.<production || development>.local');
}

// connecting to the db
const connectToDB = async () => {
  try{
    await mongoose.connect(DB_URI);
    console.log(`Connected to database in ${NODE_ENV} environment.!`);
  } catch (err) {
    console.error('Error connecting to database!', err);
    process.exit(1);
  }
}

export default connectToDB;