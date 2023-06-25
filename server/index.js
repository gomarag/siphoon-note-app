require('dotenv').config();
const logger = require('./middlewares/logger');
const path = require('path');
const fs = require('fs');
const https = require('https');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// const port = process.env.HTTPS_PORT || 5500;
const port = process.env.HTTPS_PORT || process.env.HTTP_PORT;

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
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
