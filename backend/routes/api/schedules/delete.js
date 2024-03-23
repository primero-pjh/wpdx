const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.delete('/api/schedules/:scheduleId', async (req, res, next) => {
    /*
        #swagger.description = '특정 일정을 삭제하는 API'
        #swagger.tags = ['schedules']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                scheduleId: 0,
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    
    let scheduleId = req.params.scheduleId;
    let [results] = await db.query(`
        update schedules
        set status=?, dateDeleted=?
        where id=?
    `, [0, new Date(), scheduleId]);
  
    return res.json({
        success: 1,
        message: '삭제하였습니다.',
    });
});

module.exports = router;
