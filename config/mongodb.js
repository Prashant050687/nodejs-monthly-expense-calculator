const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;

const connectDB = async function connectToMongoDb() {
  const conn = await mongoose.connect(process.env.MONGO_URI);
};
mongoose.set('strictQuery', true);

module.exports = { connectDB, mongoUri };
