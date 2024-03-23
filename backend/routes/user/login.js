const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const crypto = require('crypto');
const cfg = require(`${path}/config`);
const redis = require(`${path}/redis`);
const jwt = require('jsonwebtoken');
let CRT_ERROR_CODE = require(`${path}/error_code`);

function hashTest(salt, password) {
    // const salt = crypto.randomBytes(32).toString('hex');
    return crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');
}

router.post('/user/login', async function(req, res, next) {
    /*
        #swagger.description = 'YBR에서 제공하는 일반 로그인 API'
        #swagger.tags = ['user']
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                params: {
                    userId: '',
                    password: '',
                    rememberMe: true,
                }
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    const io = require(`${path}/bin/www`)["io"];
    let userId = req.body.params.userId;
    let password = req.body.params.password;
    let rememberMe = req.body.params.rememberMe;

    let error = new Object();
    if(!userId) { error["userId"] = "필수입력 항목입니다!"; }
    if(!password) { error["password"] = "필수입력 항목입니다!"; }
    if(Object.keys(error).length > 0) {
        return res.json({
            success: 0,
            error: error,
        });
    }
    /* 암호화 */
    let [rows, fields] = await db.query(`
        select 
            u.userId, u.UID, u.phoneNumber, u.image, u.userName, 
            u.isAdmin, u.coupleInfoId, u.coupleUID, u.password, u.code,
            us.salt
        from appUsers as u 
        join userSalts as us on u.UID=us.UID
        where u.userId=?
    `, [userId]);
    let user = rows[0];
    if(!user) {
        error["userId"] = "존재하지 않는 아이디거나, 비밀번호가 일치하지 않습니다.";
        return res.json({
            success: 0,
            error,
        });
    }
    /* 로그인이 존재하는 경우 기존 로그인까지도 해제 */
    if(user_dict.hasOwnProperty(user.UID)) {
        io.to(user_dict[user.UID].socketId).emit('/client/user/duplication/login');
        return res.json({
            success: 0,
            isDuplicationLogin: true
        });
    }

    user_dict[user.UID] = new Object();
    /* user null check */
    
    password = hashTest(user.salt, password);
    if(password != user.password) {
        error["userId"] = "존재하지 않는 아이디거나, 비밀번호가 일치하지 않습니다.";
        return res.json({
            success: 0,
            error,
        });
    }

    user_dict[user.UID]["couple"] = {
        socketId: '',
        UID: ''
    };

    /* get couple info */
    let couple = null;
    if(user.coupleInfoId > 0) {
        let [rows, fields] = await db.query(`
            select 
                u.userId, u.UID, u.phoneNumber, u.image, u.userName, u.coupleInfoId,
                ci.backgroundImageElement, ci.backgroundImageUrl
            from appUsers as u 
            join coupleInfos as ci on u.coupleInfoId=ci.coupleInfoId
            where ci.status=1 and u.UID=?
        `, [user.coupleUID]);
        couple = rows[0];
        if(!couple) {
            return res.json({
                success: 0,
                message: '커플 정보가 잘못되었습니다. 확인 후 다시 시도해주세요',
            });
        }
        user_dict[user.UID].couple.UID = couple.UID;
    }
    
    // /* set cookie */
    let APP_ACC_TKN = null; // access_token
    let APP_REF_TKN = null; // refresh_token
    /* 
        자동로그인 여부와 관계 없이 access token(1시간)을 발급 후 cookie에 저장한다.
    */
    APP_ACC_TKN = jwt.sign({ 
        userId: userId,
        UID: user.UID
    }, cfg.jwtKey, {
        expiresIn: "1 hours",
    });
    res.cookie('token', APP_ACC_TKN);

    /* couple socketId */
    let coupleSocketId = "";
    if(couple) {
        if(user_dict.hasOwnProperty(couple.UID)) {
            coupleSocketId = user_dict[couple.UID].socketId;
            user_dict[user.UID].couple.socketId = coupleSocketId;
            couple.socketId = coupleSocketId;
        }
    }
    
    return res.json({
        success: 1,
        user,
        couple,
        token: {
            APP_ACC_TKN
        },
        // user,
        // couple,
        // coupleSocketId,
    });
});


module.exports = router;
