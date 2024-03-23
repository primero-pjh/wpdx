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

router.get('/api/couple/:coupleInfoId/chat', async function(req, res, next) {
    /*
        #swagger.description = '커플의 채팅 기록을 들고오는 API'
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
    const io = require(`${path}/bin/www`)["io"];

    let coupleInfoId = req.params.coupleInfoId;
    console.log("coupleInfoId:", coupleInfoId);
    
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let start_date = `${year}-${month - 1 >= 10 ? (month - 1) : '0' + (month - 1)}`;
    let end_date = `${year}-${month >= 10 ? month : '0' + month}`;
    console.log(start_date, end_date);

    return res.json({
        success: 1,
    });
});

module.exports = router;
