const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.post('/api/couple/:coupleInfoId/schedules-classifications', async (req, res, next) => {
    /*
        #swagger.description = '특정 커플의 일정-카테고리를 생성하는 API'
        #swagger.tags = ['/couple/schedules/classifications']
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

    let title = req.body.title;
    let color = req.body.color;
    let coupleInfoId = req.params.coupleInfoId;
    let error = new Object();

    if(!color) {
        color = 'black';
    }
    if(!title) {
        error["title"] = "필수입력 항목입니다.";
        return res.json({
            success: 0,
            error: error,
        })
    }
    if(!coupleInfoId) {
        return res.json({
            success: 0,
            isLogged: false,
        });
    }
    await db.query(`
        insert into coupleScheduleClassifications (coupleInfoId, title, color, status, dateAdded)
        values (?, ?, ?, ?, ?)
    `, [coupleInfoId, title, color, 1, new Date()]);
    
    return res.json({
        success: 1,
        message: '분류(필터) 추가 완료',
    });
});

module.exports = router;
