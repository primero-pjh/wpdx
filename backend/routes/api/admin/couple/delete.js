const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

/* 
    
*/
router.delete('/api/admin/couple/:coupleInfoId', async (req, res, next) => {
    let user_dict = require(`${path}/app`)["user_dict"];
    const db = require(`${path}/mysql2`);

    let coupleInfoId = req.params.coupleInfoId;
    console.log("coupleInfoId:", coupleInfoId);
    
    let [rows] = await db.query(`
        select ci.*
        from coupleInfos as ci
        where ci.coupleInfoId=?
    `, [coupleInfoId]);

    if(rows.length == 0) {
        return res.json({
            success: 0,
            message: '등록된 커플이 아니거나, 잘못된 API 요청입니다. 새로고침 후 다시 시도해주세요.'
        });
    }

    let coupleInfo = rows[0];
    await db.query(`
        update appUsers
        set spousePhoneNumber=?, coupleInfoID=?
        where UID=?
    `, ['', 0, coupleInfo.toUID]);

    await db.query(`
        update appUsers
        set spousePhoneNumber=?, coupleInfoID=?
        where UID=?
    `, ['', 0, coupleInfo.fromUID]);

    await db.query(`
        update coupleInfos
        set status=?
        where coupleInfoId=?
    `, [0, coupleInfoId]);

    return res.json({
        success: 1,
        message: '등록해제 완료!'
    });
});

module.exports = router;
