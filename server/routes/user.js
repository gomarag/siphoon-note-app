const router = require('express').Router();
const {
    signup,
    signin,
    signout,
    deleteUserInfo,
    getUserInfo,
    updateUserInfo,
} = require('../controllers/userController');

router.post('/signup', signup);
router.post('/signin', signin);
router.delete('/signout', signout);
router.get('/userinfo', getUserInfo);
router.patch('/userinfo', updateUserInfo);
router.delete('/userinfo', deleteUserInfo);

module.exports = router;
