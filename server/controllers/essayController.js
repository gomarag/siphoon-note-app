const logger = require('../middlewares/logger');
const { tokenValidator } = require('../middlewares/tokenValidator');

module.exports = {
    createEssay: async (req, res) => {
        const { content, isPublic } = req.body;
        logger.debug(req.body);

        if (!content) {
            logger.info('Please, check your request! Missing Parameters');
           return res.status(400).json({ message: 'Please, check your request! Missing Parameters' });
        }

        try {
            // 토큰 검증으로 user_id 가져오기
            // const { user_id } = await tokenValidator(accessToken);

            // if (!user_id) {
            //     logger.info('Please, check your request! Invalid Token');
            //     return res.status(400).json({ message: 'Please, check your request! Invalid Token' });
            // }

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
    // 사용자 액션에 의해 발생되는 요청이 아니라
    // signin, signup 등의 요청에 의해 발생되는 요청이므로
    // signin이 성공했을 경우,
    // 클라이언트로부터 헤더의 토큰을 받아서
    // 디코딩하여 user_id를 가져온다.
    getEssayList: async (req, res) => {
        // 화면 페이징 처리가 되어있지 않기에, 
        // 일단 limit = 30, offset = 0으로 고정
        // 추후: offset = (pageNum -1) * limit으로 변경
        // const { limit, offset } = req.params;
        const limit = 30;
        const offset = 0;
        // const { accessToken } = req.headers.authorization;
        // logger.debug('accessToken: ', accessToken);
        try {
            // if (!accessToken) {
            //     logger.info('Unauthorized! Please, Signin first');
            //     return res.status(401).json({ message: 'Unauthorized! Please, Signin first' });
            // }

            // const { decodedToken } = await tokenValidator(accessToken);
            // logger.debug(decodedToken);
            // if (!decodedToken) {
            //     return res.status(401).json({ message: 'Bad Request! Please, Signin Again' });
            // }

            // const { user_id } = decodedToken;

            const essayList = await Essay.findAll({
                where: {
                    // user_id,
                    is_deleted: false,
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            });

            if (!essayList) {
                logger.info('Not Found!');
                return res.status(404).json({ message: 'Not Found!' });
            }

            res.status(200).json({
                message: 'Successfully get an essay list',
                data: essayList
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error! Cannot get an essay list' });
        }

    },
    updateEssay: async (req, res) => {
        const { id } = req.params; // essay_id
        const { content, is_deleted, is_public } = req.body;

        if (!id || !content || !is_public) {
            return res.status(400).json({ message: 'Please, check your request! Missing Parameters' });
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

            if (!updatedEssay) {
                return res.status(500).json({ message: 'Internal Server Error. Can not update essay!' });
            }
            res.status(200).json({ message: 'Successfully updated an essay', data: updatedEssay });
        } catch (err) {
            logger.error('Internal Server Error.');
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    },
    // getEssayListByfilter: async (req, res) => {
    //     // tag를 인자로 받아서 해당 tag를 가진 essay들을 가져온다.
    //     const { tag } = req.query;

    //     try {
    //         const filterdEssayList = await Essay.findAll({
    //             where: { tag },
    //         });
            
    //         // ! 몇 개까지 한 번에 보여줄 것인지 정해야 함
    //         if (filterdEssayList.length === 0) {
    //             errorResponse({
    //                 res,
    //                 status: 404,
    //                 message: 'Not Found! Cannot find any essay',
    //             });
    //         } else {
    //             successResponse({
    //                 res,
    //                 status: 200,
    //                 message: 'Successfully get essay list',
    //                 data: filterdEssayList,
    //             });
    //         }
    //     } catch (error) {
    //         errorResponse({
    //             res,
    //             status: 500,
    //             message: 'Internal Server Error! Cannot get essay list',
    //         });
    //     }
    // },
    // getDeletedEssayList: async (req, res) => {
    //     try {
    //         const deletedEssayList = await Essay.findAll({
    //             where: { is_deleted: true },
    //         });

    //         if (deletedEssayList.length === 0) {
    //             errorResponse({
    //                 res,
    //                 status: 404,
    //                 message: 'Not Found! Cannot find any essay',
    //             });
    //         } else {
    //             successResponse({
    //                 res,
    //                 status: 200,
    //                 message: 'Successfully get deleted essay list',
    //                 data: deletedEssayList,
    //             });
    //         }
    //     } catch (error) {
    //         errorResponse({
    //             res,
    //             status: 500,
    //             message: 'Internal Server Error! Cannot get deleted essay list',
    //         });
    //     }
    // },
    // getTagList: async (req, res) => {
    //     // 유저 아이디를 인자로 받아서 해당 유저가 작성한 essay들의 tag를 가져온다.
    //     const { user_id } = req.query;

    //     try {
    //         const tagList = await Essay.findAll({
    //             where: { user_id },
    //             attributes: ['tag'],
    //         });

    //         if (tagList.length === 0) {
    //             errorResponse({
    //                 res,
    //                 status: 404,
    //                 message: 'Not Found! Cannot find any essay',
    //             });
    //         } else {
    //             successResponse({
    //                 res,
    //                 status: 200,
    //                 message: 'Successfully get tag list',
    //                 data: tagList,
    //             });
    //         }
    //     } catch (error) {
    //         errorResponse({
    //             res,
    //             status: 500,
    //             message: 'Internal Server Error! Cannot get tag list',
    //         });
    //     }
    // },
}
