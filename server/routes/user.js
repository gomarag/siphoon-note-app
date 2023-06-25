const router = require('express').Router();
const {
    signup,
    signin,
    signout,
    deleteUserInfo,
    getUserInfo,
    updateUserInfo,
} = require('../controllers/userController');

router.post('/', signup);
router.post('/', signin);
router.delete('/', signout);
router.get('/', getUserInfo);
router.patch('/', updateUserInfo);
router.delete('/', deleteUserInfo);

module.exports = router;
