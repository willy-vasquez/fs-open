const mongoose = require('mongoose');
const config = require('./config');
const { info, error } = require('./logger');

mongoose.set('strictQuery', false);

let url = config.MONGO_URL;
const password = config.MONGO_PASSWD;
url = url.replace('MONGO_PASSWORD', password);
info('connecting to MongoDB');

const connectDB = async () => {
  await mongoose
    .connect(url)
    .then(() => info('connected to mongoDB'))
    .catch((error) => error(error.message));
};

module.exports = connectDB;
