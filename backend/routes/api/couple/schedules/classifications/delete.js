const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.delete('/api/couple/:coupleInfoId/schedules-classifications/:coupleScheduleClassificationId', async (req, res, next) => {
    /*
        #swagger.description = '특정 커플의 일정 필터를 삭제하는 API'
        #swagger.tags = ['couple']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                coupleInfoId: 0,
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    let coupleInfoId = req.params.coupleInfoId;
    let coupleScheduleClassificationId = req.params.coupleScheduleClassificationId;
    if(!coupleInfoId) {
        return res.json({
            success: 0,
            isLogged: false,
        });
    }
    
    await db.query(`
        delete from coupleScheduleClassifications
        where coupleScheduleClassificationId=?
    `, [coupleScheduleClassificationId]);

    
    return res.json({
        success: 1,
        message: '분류(필터)를 삭제하였습니다.',
    });
});

module.exports = router;
