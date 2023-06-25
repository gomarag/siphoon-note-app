const express = require('express');
const router = express.Router();
const logger = require('../middlewares/logger');

// 1. landing
// router.get('/', require('./landing'));

router.use(`/signup`, require('./user'));
router.use(`/signin`, require('./user'));
router.use(`/signout`, require('./user'));
router.use(`/usersinfo`, require('./user'));

// 3. essay
// router.use(`/essays`, require('./essay'));

// // 4. trash
// router.use(`/trashes`, require('./trash'));

// // 5. user

// // 6. tag
// router.use(`/tags`, require('./tag'));

router.use((req, res, next) => {
  const err = new Error(`😈 ${req.method} ${req.url} Router Not Found 😈`);

  logger.error(err);

  err.status = 404;
  next(err);
});

router.use((err, req, res, next) => {
  logger.error(err);

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = router;
