require('dotenv').config();
const logger = require('./middlewares/logger');
const https = require('https');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const port = process.env.HTTPS_PORT || process.env.HTTP_PORT;

sequelize.sync({ force: false })
  .then(() => {
    logger.info('데이터베이스 연결 성공');
  })
  .catch((err) => {
    logger.error(err);
  });

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    // origin: process.env.ORIGIN_URL,
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
  })
);

app.use(require('./routes'));

// ssl 설정이 되어있는 도메인이라 따로 key, cert 필요없지 않을까
// const credentials = {
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
// };

// const secureServer = https.createServer(credentials, app);
const server = https.createServer(app);

server.listen(port, () => {
  logger.info(`Server on ${port}!🚀`);
});

module.exports = server;
