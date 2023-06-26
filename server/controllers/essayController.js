const { Essay } = require('../models');
const logger = require('../middlewares/logger');

module.exports = {
    createEssay: async (req, res) => {
        const { content, isPublic } = req.body;
        logger.debug(req.body);
        if (!content) {
            logger.info('Please, check your request! Missing Parameters');
           return res.status(400).json({ message: 'Please, check your request! Missing Parameters' });
        }

        try {
            const newEssay = await Essay.create({
                content,
                user_id: 1,
                is_public: isPublic,
                is_deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            logger.info('Successfully created an essay');
            res.status(201).json({ message: 'Successfully created an essay', data: newEssay });
        } catch (err) {
            logger.error('Internal Server Error! Cannot create an essay');
            res.status(500).json({ message: 'Internal Server Error! Cannot create an essay' });
        }
    },
    updateEssay: async (req, res) => {
        const { id } = req.params;
        const { content, is_deleted, is_public } = req.body;

        if (!id || !content || !is_public) {
            errorResponse({
                res,
                status: 400,
                message:
                    'Please, check your request! Missing or Invalid Operation  Parameters',
            });
        }

        try {
            const updatedEssay = await Essay.update(
                {
                    content,
                    is_deleted,
                    is_public,
                },
                {
                    where: { id },
                },
            );

            successResponse({
                res,
                status: 200,
                message: 'Successfully updated an essay',
                data: updatedEssay,
            });
        } catch (err) {
            errorResponse({
                res,
                status: 500,
                message: 'Internal Server Error! Cannot update an essay',
            });
        }
    },
    getEssayListByfilter: async (req, res) => {
        // tag를 인자로 받아서 해당 tag를 가진 essay들을 가져온다.
        const { tag } = req.query;

        try {
            const filterdEssayList = await Essay.findAll({
                where: { tag },
            });
            
            // ! 몇 개까지 한 번에 보여줄 것인지 정해야 함
            if (filterdEssayList.length === 0) {
                errorResponse({
                    res,
                    status: 404,
                    message: 'Not Found! Cannot find any essay',
                });
            } else {
                successResponse({
                    res,
                    status: 200,
                    message: 'Successfully get essay list',
                    data: filterdEssayList,
                });
            }
        } catch (error) {
            errorResponse({
                res,
                status: 500,
                message: 'Internal Server Error! Cannot get essay list',
            });
        }
    },
    getDeletedEssayList: async (req, res) => {
        try {
            const deletedEssayList = await Essay.findAll({
                where: { is_deleted: true },
            });

            if (deletedEssayList.length === 0) {
                errorResponse({
                    res,
                    status: 404,
                    message: 'Not Found! Cannot find any essay',
                });
            } else {
                successResponse({
                    res,
                    status: 200,
                    message: 'Successfully get deleted essay list',
                    data: deletedEssayList,
                });
            }
        } catch (error) {
            errorResponse({
                res,
                status: 500,
                message: 'Internal Server Error! Cannot get deleted essay list',
            });
        }
    },
    getTagList: async (req, res) => {
        // 유저 아이디를 인자로 받아서 해당 유저가 작성한 essay들의 tag를 가져온다.
        const { user_id } = req.query;

        try {
            const tagList = await Essay.findAll({
                where: { user_id },
                attributes: ['tag'],
            });

            if (tagList.length === 0) {
                errorResponse({
                    res,
                    status: 404,
                    message: 'Not Found! Cannot find any essay',
                });
            } else {
                successResponse({
                    res,
                    status: 200,
                    message: 'Successfully get tag list',
                    data: tagList,
                });
            }
        } catch (error) {
            errorResponse({
                res,
                status: 500,
                message: 'Internal Server Error! Cannot get tag list',
            });
        }
    },
}
