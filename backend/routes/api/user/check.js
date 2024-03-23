const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const knex = require(`${path}/db`);
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

/* GET users listing. */
router.get('/api/user/check', async function(req, res, next) {
    /*
        #swagger.description = ''
        #swagger.tags = ['user']
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                
            }
        }
    */
    let user_dict = require(`${path}/app`)["user_dict"];
    let token = req.query.token;
  
    let info = await jwtFunc.verify(token);
    let couple = null;
    if(info && Object.keys(info).length > 0) {
        let userId = info.userId;
        let user = await knex.table("appUsers as u")
            .select('u.userId', 'u.UID', 'u.spousePhoneNumber', 'u.phoneNumber', 'u.image',
            'u.userName', 'u.isAdmin', 'u.coupleInfoId')
            .where("u.userId", userId).first();
        
        couple = await knex.table("appUsers as u")
            .select('u.userId', 'u.UID', 'u.spousePhoneNumber', 'u.phoneNumber', 'u.coupleInfoId',
            'u.userName', 'u.image', 'ci.backgroundImage')
            .join('coupleInfos as ci', 'u.coupleInfoId', '=', 'ci.coupleInfoId')
            .where('u.phoneNumber', user.spousePhoneNumber).first();

        /* couple socketId */
        let coupleSocketId = "";
        if(couple) {
            if(user_dict.hasOwnProperty(couple.phoneNumber)) {
                coupleSocketId = user_dict[couple.phoneNumber].socketId;
            }
        }

        return res.json({
            success: 1,
            user,
            couple,
            coupleSocketId,
        });
    }

    return res.json({
        success: 0,
        message: '토큰이 올바르지 않습니다.',
    });
});

module.exports = router;
