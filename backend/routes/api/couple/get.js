const express = require('express');
const fs = require(`fs`);
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const knex = require(`${path}/db`);
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);
const { v4 } = require('uuid');

router.get('/api/couple/:coupleInfoId', async function(req, res, next) {
    /*
        #swagger.description = '커플의 정보를 불러오는 API'
        #swagger.tags = ['couple']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                coupleInfoId: 0,
            }
        }
    */
    let user_dict = require(`${path}/app`)["user_dict"];
    const db = require(`${path}/mysql2`);
    const io = require(`${path}/bin/www`)["io"];

    let coupleInfoId = req.params.coupleInfoId;
    
    let [couples, field] = await db.query(`
        select ci.*
        from coupleInfos as ci
        where ci.coupleInfoId=?
    `, [coupleInfoId]);

    let couple = couples[0];
    
    return res.json({
        success: 1,
        couple,
    });
});

module.exports = router;
