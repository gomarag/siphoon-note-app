const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models')
const logger = require('../middlewares/logger');

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
            
            const accessToken = jwt.sign({ email, username, profileImage }, 'your-access-token-secret', { expiresIn: '1h' });
            const refreshToken = jwt.sign({ email, username, profileImage }, 'your-refresh-token-secret', { expiresIn: '7d' });

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

                const newAccessToken = jwt.sign({ email }, 'yourSecretKey', { expiresIn: '1h' });

                res.status(200).json({
                    accessToken: newAccessToken,
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
};