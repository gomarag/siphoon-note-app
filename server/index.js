const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const { development } = require('./config/config');
const env = process.env.NODE_ENV || development;

logger.debug('Program started with NODE_ENV: ', env);

sequelize.sync({ force: false })
  .then(() => {
    logger.debug('Database connection success!');
  })
  .catch((err) => {
    logger.error(err);
  });

const app = express();
const port = (env === 'production') ? process.env.HTTPS_PORT : process.env.HTTP_PORT;

app.use(cors(
  {
    origin: (env === 'production')
      ? process.env.ORIGIN_URL
      : process.env.TEST_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
  }
));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes'));

app.use((err, req, res, next) => {
  logger.info(req.method, req.url);
  logger.error(err.status, err.message);
  res.status(err.status).send(err.message);
  next();
});

app.listen(port, () => {
  console.log(`Server is running on ${process.env.PROD_HOST || process.env.DEV_HOST}:${port}`);
});
