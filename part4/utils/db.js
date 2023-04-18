const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

mongoose.set('strictQuery', false);

let url = config.MONGO_URL;
const password = config.MONGO_PASSWD;
url = url.replace('MONGO_PASSWORD', password);
logger.info('connecting to MongoDB');

const connectDB = async () => {
  await mongoose
    .connect(url)
    .then(() => logger.info('connected to mongoDB'))
    .catch((error) => logger.error(error.message));
};

module.exports = connectDB;
