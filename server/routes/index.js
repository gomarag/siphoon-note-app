const express = require('express');
const router = express.Router();
const logger = require('../middlewares/logger');
const { signup, signin,
    // signout,
    // deleteUserInfo,
    // getUserInfo,
    // updateUserInfo,
} = require('../controllers/userController');
const { createEssay } = require('../controllers/essayController');
// 1. landing
// router.get('/', require('./landing'));

router.post('/signup', signup);
router.post('/signin', signin);
// router.delete('/', signout);
// router.patch('/', updateUserInfo);
// router.delete('/', deleteUserInfo);


// router.use(`/essays`, require('./essay'));

module.exports = router;
