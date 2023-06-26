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
};