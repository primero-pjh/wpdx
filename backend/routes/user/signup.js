const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const fs = require(`fs`);
const router = express.Router();
const knex = require(`${path}/db`);
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);
const { v4 } = require('uuid');
const crypto = require('crypto');

function hashTest(salt, password) {
    // const salt = crypto.randomBytes(32).toString('hex');
    return crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');
}

router.post('/user/signup', async function(req, res, next) {
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    let error = new Object();
    let account = req.body.account;

    if(!account.userId) {
        error["userId"] = "필수입력 항목입니다.";
    }
    if(!account.userName) {
        error["userName"] = "필수입력 항목입니다.";
    }
    if(!account.password) {
        error["password"] = "필수입력 항목입니다.";
    }
    if(account.memo.length > 500) {
        error["memo"] = "500자 이내로 작성해주세요.";
    }
    if(!account.phoneNumber) {
        error["phoneNumber"] = "필수입력 항목입니다.";
    }
    if(Object.keys(error).length > 0) {
        return res.json({
            success: 0,
            error,
        });
    }

    let [rows, fields] = await db.query(`
        select u.*
        from appUsers as u
        where u.userId=?
    `, [account.userId]);

    if(rows.length > 0) {
        return res.json({
            success: 0,
            message: '이미 회원가입한 계정이 존재합니다.',
        });
    }


    /* directory 경로가 없으면 생성 */
    let UID = v4();
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let dir = `${path}/public/images/users/${UID}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const salt = crypto.randomBytes(32).toString('hex');
    await db.query(`
        insert into userSalts
        (
            UID, salt
        )
        values
        (?, ?)
    `, [ UID, salt ]);
    let password = hashTest(salt, account.password);

    let [results] = await db.query(`
        insert into appUsers
        (
            UID, userId, userName, password, email,
            isAdmin, phoneNumber, coupleInfoId, coupleUID, image,
            code, dateAdded, status, KakaoId, memo
        )
        values
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [ 
        UID, account.userId, account.userName, password, account.email,
        0, account.phoneNumber, 0, '', '/images/default_avatar_image.jpg',
        '', new Date(), 1, '', account.memo
    ]);

    

    return res.json({
        success: 1,
        message: '회원가입 완료! 재로그인 후 이용해주세요.',
        UID,
    });
});

module.exports = router;
