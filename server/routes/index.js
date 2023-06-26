const express = require('express');
const router = express.Router();
const logger = require('../middlewares/logger');
const {
    signup,
    // signin,
    // signout,
    // deleteUserInfo,
    // getUserInfo,
    // updateUserInfo,
} = require('../controllers/UserController');
// 1. landing
// router.get('/', require('./landing'));

router.post('/signup', signup);
// router.post('/', signin);
// router.delete('/', signout);
// router.get('/', getUserInfo);
// router.patch('/', updateUserInfo);
// router.delete('/', deleteUserInfo);

// router.use(`/signup`, require('./user'));
// router.use(`/signin`, require('./user'));
// router.use(`/signout`, require('./user'));
// router.use(`/usersinfo`, require('./user'));

// router.use(`/essays`, require('./essay'));

// router.use((req, res, next) => {
//   const err = new Error(`😈 ${req.method} ${req.url} Router Not Found 😈`);
//   logger.info(err);
//   logger.error(err);

//   err.status = 404;
//   next(err);
// });

// router.use((err, req, res, next) => {
//   logger.info(req.method, req.url);
//   logger.error(err);

//   res.status(err.status || 500);
//   res.json({
//     message: err.message,
//     error: err,
//   });
// });

module.exports = router;
