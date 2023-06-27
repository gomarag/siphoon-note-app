const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models')
const logger = require('../middlewares/logger');
const { tokenValidator } = require('../middlewares/tokenValidator');
require('dotenv').config();

module.exports = {
    signup: async (req, res) => {
        try {
            const { email, password, username, gender, birthday: { year }, region } = req.body;

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                logger.info('User already exists');
                return res.status(409).json({ message: 'Email is already taken' });
            }

            const profileImage = Math.floor(Math.random() * 16);

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const accessToken = jwt.sign({ email, username, profileImage }, process.env.ACC_TOKEN_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ email, username, profileImage }, process.env.REF_TOKEN_SECRET, { expiresIn: '7d' });

            const newUser = await User.create({
                email,
                password: hashedPassword,
                name: username,
                refresh_token: refreshToken,
                gender,
                birthday: year,
                region,
                profile_image: profileImage,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            logger.log('info', 'User created successfully');
            res.set('Authorization', accessToken);
            res.status(201).json({ accessToken, message: 'User created successfully' });
        } catch (error) {
            logger.error(error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    signin: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            
            if (!user) {
                logger.info('User not found');
                return res.status(404).json({ message: 'User not found' });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                if (!isMatch) {
                    return res.status(401).json({ error: 'Incorrect password' });
                }

                // 로그인 후 만들어진 액세스 토큰은 아이디 정보를 담고 있음(회원가입은 없음)
                const newAccessToken = jwt.sign({ email, user_id: user.id }, process.env.ACC_TOKEN_SECRET, { expiresIn: '1h' });

                // 클라이언트는 로그아웃 전까지 액세스 토큰을 보관
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.set('Authorization', newAccessToken);
                res.status(200).json({
                    email: user.email,
                    username: user.name,
                    profileImage: user.profile_image,
                    gender: user.gender,
                    birthday: user.birthday,
                    region: user.region,
                });
            }).catch(error => {
                logger.error(error);
                res.status(500).json({ error: 'Server failed to decode password!' });
            });
        } catch (error) {
            logger.error(error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    signout: async (req, res) => {
        const { accessToken } = req.headers.authorization;

        try {
            // 토큰 검증 후 유효한 토큰이라면
            // 클라이언트가 보관하고 있던 액세스 토큰을 무효화하기 위해
            // 상태코드 200을 반환
            const decodedToken = await tokenValidator(accessToken);
            // Q. 만약 토큰이 유효하지 않다면?
            // A. 클라이언트가 보관하고 있던 액세스 토큰을 무효화하기 위해
            // 상태코드 401을 반환 + 클라이언트는 메인 페이지로 이동
            if (decodedToken) {
                return res.status(401).json({ message: 'Invalid token! Go back to Home!' });
            }
            res.status(200).json({ message: 'Signout successfully' });
        } catch (error) {
            logger.error(error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};