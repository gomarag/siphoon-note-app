const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const env = process.env.NODE_ENV || 'development';

logger.debug('Program started with NODE_ENV: ', env);

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

// app.use('/', require('./routes'));

app.use((err, req, res, next) => {
  logger.info(req.method, req.url);
  logger.error(err.status, err.message);
  res.status(err.status).send(err.message);
  next();
});

const server = app.listen();
const address = server.address();
logger.debug('Server is on ', address);
