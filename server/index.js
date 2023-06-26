const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');

sequelize.sync({ force: false })
  .then(() => {
    logger.info('데이터베이스 연결 성공');
  })
  .catch((err) => {
    logger.error(err);
  });

const app = express();
const port = 9000;

app.use(cors(
  {
    // origin: process.env.ORIGIN_URL,
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
  }
));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/', require('./routes'));

app.use((err, req, res, next) => {
  logger.info(req.method, req.url);
  logger.error(err.status, err.message);
  res.status(err.status).send(err.message);
  next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
