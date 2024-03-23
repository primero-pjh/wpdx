const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const knex = require(`${path}/db`);
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.post('/api/user/waiting', async function(req, res, next) {
    /*
        #swagger.description = '입력한 초대코드로 상대방에게 요청을 보내는 API'
        #swagger.tags = ['user']
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                targetCode: 'ABCDEFG1',
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    let io = require(`${path}/bin/www`)["io"];
    let error = new Object();
    let targetCode = req.body.targetCode;
    let UID = req.self.UID;

    /* error check */
    if(!targetCode) {
        error["targetCode"] = "코드를 입력해주세요.";
    }
    if(Object.keys(error).length > 0) {
        return res.json({
            success: 0,
            error,
        });
    }

    /* 자기 자신이 아닌 인가코드가 있는지 확인해야한다. */
    let [targets, fields] = await db.query(`
        select u.*
        from appUsers as u
        where u.code=? and u.UID!=?
    `, [targetCode, UID]);
    
    if(targets.length == 0) {
        error["targetCode"] = "해당 코드는 존재하지 않습니다.";
        return res.json({
            success: 0,
            error,
        });
    }
    let user = targets[0];
    let [waitings] = await db.query(`
        select w.*
        from waitings as w
        where w.toUID = ? and w.fromUID =?
    `, [user.UID, UID]);
    if(waitings.length > 0) {
        error["targetCode"] = "이미 신청을 보냈습니다.";
        return res.json({
            success: 0,
            error,
        });
    }

    let [results] = await db.query(`
        insert into waitings
        (toUID, fromUID, dateAdded)
        values
        (?, ?, ?)
    `, [ user.UID, UID, new Date() ]);
    let target_socket_id = user_dict[user.UID].socketId;
    console.log("target_socket_id:", target_socket_id);
    io.to(target_socket_id).emit(`/client/user/waiting/post`, {
        success: 1,
        message: `${user.userName}님에게 신청이 왔습니다`,
    });

    return res.json({
        success: 1,
        message: '신청 완료!',
    });
});

module.exports = router;
