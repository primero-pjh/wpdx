const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const crypto = require('crypto');
const cfg = require(`${path}/config`);
const redis = require(`${path}/redis`);
const jwtFunc = require(`${path}/jwt`);
const jwt = require('jsonwebtoken');
const axios = require('axios');
let CRT_ERROR_CODE = require(`${path}/error_code`);
const { v4 } = require('uuid');

router.put('/api/user/code', async function(req, res, next) {
    /*
        #swagger.description = '일반 사용자의 초대(인가)코드를 재발급받는 API'
        #swagger.tags = ['user']
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];

    let UID = req.self.UID;
    let code = v4().slice(0, 8).toUpperCase();
    
    await db.query(`
        update appUsers
        set code=?
        where UID=?
    `, [code, UID]);
    
    return res.json({
        success: 1,
        code,
    });
});


module.exports = router;
