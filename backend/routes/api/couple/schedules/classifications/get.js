const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.get('/api/couple/:coupleInfoId/schedules-classifications', async (req, res, next) => {
    /*
        #swagger.description = '특정 커플의 모든 일정-분류를 들고오는 API'
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
    let coupleInfoId = req.params.coupleInfoId;
    if(!coupleInfoId) {
        return res.json({
            success: 0,
            isLogged: false,
        });
    }
    let [classification_list, fields] = await db.query(`
        select s.*
        from coupleScheduleClassifications as s
        where s.coupleInfoId=? and status=?
    `, [coupleInfoId, 1]);
    
    return res.json({
        success: 1,
        classification_list,
    });
});

module.exports = router;
