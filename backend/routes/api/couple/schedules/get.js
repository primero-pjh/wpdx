const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.get('/api/couple/:coupleInfoId/schedules', async (req, res, next) => {
    /*
        #swagger.description = '특정 커플의 모든 일정들을 들고오는 API'
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
    if(!coupleInfoId) {
        return res.json({
            success: 0,
            isLogged: false,
        });
    }
    let [sche_list, fields] = await db.query(`
        select s.*
        from schedules as s
        where s.coupleInfoId=? and status=?
        order by s.start desc
    `, [coupleInfoId, 1]);
    
    return res.json({
        success: 1,
        sche_list,
    });
});

router.get('/api/couple/:coupleInfoId/schedules/:id', async (req, res, next) => {
    /*
        #swagger.description = '특정 커플의 특정 일정을 들고오는 API'
        #swagger.tags = ['couple']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                coupleInfoId: 0,
                id: 0,
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    let coupleInfoId = req.params.coupleInfoId;
    let id = req.params.id;
    if(!coupleInfoId) {
        return res.json({
            success: 0,
            isLogged: false,
        });
    }
    let [sche_list, fields] = await db.query(`
        select s.*
        from schedules as s
        where s.coupleInfoId=? and id=? and status=?
    `, [coupleInfoId, id, 1]);
    let schedule = null;
    if(sche_list.length > 0) {
        schedule = sche_list[0];
    }
    
    return res.json({
        success: 1,
        schedule,
    });
});

module.exports = router;
