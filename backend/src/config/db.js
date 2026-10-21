import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aurelia_hotel');
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection Error: ${error.message}`);
    console.warn('[MongoDB] Server continuing to run in standalone/demo mode without MongoDB.');
  }
};

export default connectDB;
