require('express-async-errors');
const express = require('express');
const connectDB = require('./utils/db');
const cors = require('cors');
const middleware = require('./utils/middleware');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/login'));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
