require('dotenv').config();

const PORT = process.env.PORT || 3003;
const MONGO_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

const MONGO_PASSWD = process.env.MONGO_PWD;

module.exports = {
  PORT,
  MONGO_URL,
  MONGO_PASSWD,
};
