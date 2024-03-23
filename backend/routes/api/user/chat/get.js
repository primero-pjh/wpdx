const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const knex = require(`${path}/db`);
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.get('/api/user/chat/:chatInfoId', async function(req, res, next) {
    /*
        #swagger.description = '유저가 가지고 있는 chat-room-list를 들고오는 API'
        #swagger.tags = ['user']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                chatInfoId: 0,
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    let io = require(`${path}/bin/www`)["io"];
    let error = new Object();
    let chatInfoId = req.params.chatInfoId;
    let UID = req.self.UID;

    let [msg_list, field] = await db.query(`
        select cl.* 
        from chatLogs as cl
        where cl.chatInfoId=?
        order by cl.chatId asc
    `, [chatInfoId]);
    
    return res.json({
        success: 1,
        msg_list,
    });    
    
});

module.exports = router;
