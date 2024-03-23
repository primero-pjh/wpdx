const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.put('/api/couple/:coupleInfoId/backgroundImageElement', async (req, res, next) => {
    /*
        #swagger.description = '특정 커플의 BackgroundImageElement를 저장하는 API'
        #swagger.tags = ['/couple']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                coupleInfoId: 0,
                backgroundImageElement: 0,
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];

    let coupleInfoId = req.params.coupleInfoId;
    let backgroundImageElement = req.body.backgroundImageElement;

    
    await db.query(`
        update coupleInfos 
        set backgroundImageElement=?
        where coupleInfoId=?
    `, [backgroundImageElement, coupleInfoId]);
    
    return res.json({
        success: 1,
        message: '업데이트 완료!',
    });
});

module.exports = router;
