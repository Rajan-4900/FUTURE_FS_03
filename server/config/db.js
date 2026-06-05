const mongoose = require('mongoose');

let memoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/evre_db';

  try {
    const conn = await mongoose.connect(uri, { autoIndex: true });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error(`Database Connection Error: ${error.message}`);
      process.exit(1);
    }

    console.warn(`Local MongoDB unavailable (${error.message}). Using in-memory database for development.`);

    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    const memUri = memoryServer.getUri('evre_db');
    const conn = await mongoose.connect(memUri, { autoIndex: true });
    console.log('In-memory MongoDB connected (development fallback)');
    return conn;
  }
};

module.exports = connectDB;
