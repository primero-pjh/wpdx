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

router.post('/user/kakao/signup', async function(req, res, next) {
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    let error = new Object();
    let account = req.body.account;
    let isImageChange = req.body.isImageChange;
    let filename = req.body.filename;

    if(!account.nickname) {
        error["nickname"] = "필수입력 항목입니다.";
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
        where u.kakaoId=?
    `, [account.kakaoId]);

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

    let image_old_path = '';
    let db_image_path = '';
    if(account.isImageChange) {
        image_old_path = `${path}/public/images/temp/profile_image/${filename}`;
        let image_new_path = `${path}/public/images/users/${UID}/${filename}`;
        fs.rename(image_old_path, image_new_path, function (err) {
            if (err) { throw err;}
        });
        db_image_path = `/images/users/${UID}/${filename}`;
    } else {
        db_image_path = `/images/default_avatar_image.jpg`;
    }

    await db.query(`
        insert into appUsers
        (
            UID, userId, userName, password, email,
            isAdmin, phoneNumber, coupleInfoId, coupleUID, image,
            code, dateAdded, status, KakaoId, memo
        )
        values
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [ 
        UID, '', account.nickname, '', account.email,
        0, '', 0, '', db_image_path,
        '', new Date(), 1, account.kakaoId, account.memo
    ]);

    return res.json({
        success: 1,
        message: '회원가입 완료! 재로그인 후 이용해주세요.'
    });
});

module.exports = router;
