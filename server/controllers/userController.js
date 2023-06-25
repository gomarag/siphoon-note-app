const User = require('../models/users');
const {
    successResponse,
    successResponseWithToken,
    errorResponse,
} = require('../middlewares/responses/responseHandler');
const {
  createAccessToken,
  createRefreshToken,
//   detroyToken,
} = require('../middlewares/auth');
const { encrypt } = require('../middlewares/utils');
const logger = require('../middlewares/logger');

module.exports = {
    signup: async (req, res) => {
        const { email, username, password, gender, birthday, region } = req.body;

        if (!email || !username || !password) {
            errorResponse({
                res,
                status: 400,
                message:
                    'Please, check your request! Missing or Invalid Operation Parameters',
            });
        }

        // isExist: null -> 가입 가능
        // isExist: '__' -> 가입 불가
        try {
            const isExist = await User.findOne({
                where: { email },
            });

            if (isExist) {
                errorResponse({
                    res,
                    status: 409,
                    message: 'Email already Exists! Please enter another address!',
                });
            }

            const getRandomIdx = () => {
                return Math.floor(Math.random() * 16);
            };

            const accountInfoForToken = {
                email,
                username,
                profileImage: getRandomIdx(),
            };

            const accessToken = createAccessToken(accountInfoForToken);
            const refreshToken = createRefreshToken(accountInfoForToken);
            const encryptedPasswd = encrypt(password);

            const newUser = await User.create({
                refreshToken,
                email,
                name: username,
                password: encryptedPasswd,
                gender,
                birthday,
                region,
                profile_image: accountInfoForToken.profileImage,
            });

            logger.debug('Created UserInfo is', newUser);

            successResponseWithToken({
                res,
                accessToken,
                status: 201,
                message: 'Successfully signed up',
            });
        } catch (error) {
            errorResponse({
                res,
                status: 500,
                message: 'Sorry, Cannot Create New User Account! Internal Server Error',
            });
        }
    },
    signin: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            errorResponse({
            res,
            status: 400,
            message: 'Please provide email and password',
            });
        }

        try {
            const userInfo = await User.findOne({
            where: {
                email,
                password,
            },
            });

            if (!userInfo) {
            errorResponse({
                res,
                status: 400,
                message: 'Wrong email or password',
            });
            }

            const { email, name, refreshToken, profile_image } = userInfo.dataValues;

            const isValidToken = await tokenValidator(refreshToken);

            if (!isValidToken) {
            errorResponse({
                res,
                status: 400,
                message: 'Refresh token is not valid',
            });
            }

            const accessToken = createAccessToken({ email, name, profile_image });
            logger.debug('signin', 'accessToken', accessToken);

            successResponseWithToken({
            res,
            status: 200,
            message: 'Successfully signed in',
            });
        } catch (error) {
            errorResponse({
            res,
            status: 500,
            message: 'Internal Server Error',
            });
        }
    },
    signout: async (req, res) => {
        const { email } = req.body;

        if (!email) {
            errorResponse({
            res,
            status: 400,
            message: 'Please provide email',
            });
        }

        try {
            const userInfo = await User.findOne({
            where: { email },
            });

            if (!userInfo) {
            errorResponse({
                res,
                status: 400,
                message: 'Wrong email',
            });
            }

            const { refreshToken } = userInfo.dataValues;

            const isValidToken = await tokenValidator(refreshToken);

            if (!isValidToken) {
            errorResponse({
                res,
                status: 400,
                message: 'Refresh token is not valid',
            });
            }

            await User.update(
            { refreshToken: null },
            { where: { email } },
            );

            successResponse({
            res,
            status: 200,
            message: 'Successfully signed out',
            });
        } catch (error) {
            errorResponse({
            res,
            status: 500,
            message: 'Internal Server Error',
            });
        }
    },
    getUserInfo: async (req, res) => {
        const { email } = req.body;

        if (!email) {
            errorResponse({
            res,
            status: 400,
            message: 'Please provide email',
            });
        }

        try {
            const userInfo = await User.findOne({
            where: { email },
            });

            if (!userInfo) {
            errorResponse({
                res,
                status: 400,
                message: 'Wrong email',
            });
            }

            const { username, profileImage, gender, birthday, region  } = userInfo.dataValues;

            successResponse({
                res,
                status: 200,
                message: 'Successfully read User Information!',
                data: {
                    username,
                    profileImage,
                    gender,
                    birthday,
                    region,
                },
            });
        } catch (error) {
            errorResponse({
            res,
            status: 500,
            message: 'Internal Server Error',
            });
        }
    },
    updateUserInfo: async (req, res) => {

    },
    deleteUserInfo: async (req, res) => {

    },
}