const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const knex = require(`${path}/db`);
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.get('/api/user/chat/rooms', async function(req, res, next) {
    /*
        #swagger.description = '유저가 가지고 있는 chat-room-list를 들고오는 API'
        #swagger.tags = ['user']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                type: '',
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    let io = require(`${path}/bin/www`)["io"];
    let error = new Object();
    let type = req.query.type;
    let UID = req.self.UID;

    let [room_list, field] = await db.query(`
        select ci.* 
        from chatMembers as cm
        join chatInfos as ci on cm.chatInfoId=ci.chatInfoId
        where cm.UID=? and ci.type=? and ci.status=1
    `, [UID, type]);

    if(type == 'couple') {
        return res.json({
            success: 1,
            room: room_list[0],
        });
    } else {
        return res.json({
            success: 1,
            room_list
        });    
    }

    
});

module.exports = router;
