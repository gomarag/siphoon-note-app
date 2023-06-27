const express = require('express');
const router = express.Router();

const { signup, signin, signout,
    // deleteUserInfo,
    // getUserInfo,
    // updateUserInfo,
} = require('../controllers/userController');
const { createEssay, getEssayList } = require('../controllers/essayController');
// 1. landing
router.get('/', require('../controllers/homeController'));
// router.get('/', (req, res) => {
//     res.status(200).send('Hello, World!');
// });

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
// router.patch('/', updateUserInfo);
// router.delete('/', deleteUserInfo);


router.post(`/essays`, createEssay);
router.get(`/essays`, getEssayList);

module.exports = router;
