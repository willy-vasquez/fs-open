require('dotenv').config();
const { PORT } = require('./utils/config');
const app = require('./app');
const { info } = require('./utils/logger');

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
