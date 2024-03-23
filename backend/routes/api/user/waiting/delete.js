const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.delete('/api/user/waiting/:waitingId', async function(req, res, next) {
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    let io = require(`${path}/bin/www`)["io"];
    
    if(!req.params.hasOwnProperty('waitingId')) {
        return res.json({
            success: 0,
            message: '잘못된 요청입니다. 새로고침 후 다시 시도해주세요.',
        });
    }
    let waitingId = req.params.waitingId;

    let [waitings] = await db.query(`
        select w.*
        from waitings as w
        where w.waitingId=?
    `, [waitingId]);

    if(waitings.length == 0) {
        return res.json({
            success: 0,
            message: '잘못된 요청입니다. 새로고침 후 다시 시도해주세요.',
        });
    }
    let waiting = waitings[0];

    await db.query(`
        delete from waitings
        where waitingId=?
    `, [waitingId]);

    let targetUID = waiting.fromUID;
    let [users] = await db.query(`
        select u.*
        from appUsers as u
        where u.UID=?
    `, [targetUID]);
    let user = users[0];

    if(user_dict.hasOwnProperty(waiting.fromUID) && user_dict[waiting.fromUID].hasOwnProperty("socketId")) {
        io.to(user_dict[waiting.fromUID].socketId).emit(`/client/user/waiting/delete`, {
            success: 1,
            message: `${user.userName}님에게 보낸 신청이 거절되었습니다.`,
        });
    }
    

    return res.json({
        success: 1,
        message: '삭제 완료',
    });
});

module.exports = router;
