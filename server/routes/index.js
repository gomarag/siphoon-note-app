const express = require('express');
const router = express.Router();

const { signup, signin, signout } = require('../controllers/userController');
const { createEssay, getEssayList } = require('../controllers/essayController');

router.get('/', require('../controllers/homeController'));

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

router.post(`/essays`, createEssay);
router.get(`/essays`, getEssayList);

module.exports = router;
