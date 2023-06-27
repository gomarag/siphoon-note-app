require('dotenv').config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.ACC_TOKEN_SECRET;
const logger = require('./logger');

const tokenValidator = async (token = '') => {
  logger.debug('tokenValidator', token);

  const decodedToken = jwt.verify(token, secretKey);

  if (!decodedToken) {
    logger.error('tokenValidator', 'token is not valid');
    return false;
  }

  return decodedToken;
};

module.exports = { tokenValidator };
