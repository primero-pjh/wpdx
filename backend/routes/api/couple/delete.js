const express = require('express');
const fs = require(`fs`);
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const knex = require(`${path}/db`);
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.delete('/api/couple/:coupleInfoId', async function(req, res, next) {
    /*
        #swagger.description = '커플 연결 해제하는 API<br><br>
        
        * 로직<br>
            1. coupleInfo의 status를 0으로 변경<br>
            2. 해당 appUsers의 coupleInfoId와 coupleUID를 초기화 <br>
            3. 해당 appUsers의 모든 chatInfo의 status를 초기화<br>
            4. 접속 중인 커플이 있다면 LOGIN PAGE로 강제 이동<br>
        '
        #swagger.tags = ['couple']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                coupleInfoId: 0,
            }
        }
    */
    let user_dict = require(`${path}/app`)["user_dict"];
    const db = require(`${path}/mysql2`);
    const io = require(`${path}/bin/www`)["io"];
    const UID = req.self.UID;   // 해체한 사람
    let coupleUID = '';
    try {
        coupleUID = user_dict[UID].couple.UID;
    } catch(err) {
        return res.json({
            success: 0,
            message: '이미 연결해제되었습니다. 새로고침 후 다시 시도해주세요.'
        });
    }
    
    let coupleInfoId = req.params.coupleInfoId;
    /* coupleInfos의 Status를 0으로 변경 */
    let [coupleInfos, field] = await db.query(`
        select * 
        from coupleInfos 
        where coupleInfoId = ?
    `, [coupleInfoId]);
    if(coupleInfos.length == 0) {
        return res.json({
            success: 0,
            message: '이미 연결해제되었습니다. 새로고침 후 다시 시도해주세요.'
        });
    }
    let couple = coupleInfos[0];

    await db.query(`
        update coupleInfos
        set status = ?
        where coupleInfoId = ?
    `, [0, coupleInfoId]);
    /* appUsers의 coupleInfo 변경 */
    await db.query(`
        update appUsers
        set coupleInfoId = 0, coupleUID = ''
        where coupleInfoId = ?
    `, [coupleInfoId]);

    /* chatInfo의 type: couple status를 0으로 변경 */
    await db.query(`
        update chatInfos ci
        join chatMembers cm on ci.chatInfoId = cm.chatInfoId
        set ci.status = 0
        where cm.UID in (?, ?)
    `, [UID, coupleUID]);
    
    try {
        let coupleSocketId = user_dict[UID].couple.socketId;
        io.to(coupleSocketId).emit(`/client/couple/delete`);
    } catch(err) {
        console.log("err:", err);
    }

    return res.json({
        success: 1,
    });
});

module.exports = router;
