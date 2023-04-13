const express = require('express');
const connectDB = require('./utils/db');
const cors = require('cors');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;
