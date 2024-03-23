const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.put('/api/user/couple', async function(req, res, next) {
    /*
        #swagger.description = '커플을 등록하는 API<br>
            * 로직<br>
            1. coupleInfo에 등록한다.<br>
            2. chatInfo type:couple 을 등록한다. (chatMembers도 추가)<br>
            3. appUser에 coupleInfoId 및 coupleUID를 등록한다.<br>
            4. default-schedule-category 등록한다. <br>
            5. waiting(대기열)의 모든 목록을 삭제한다.<br>
            6. 접속 중인 자신 및 상대방에게 재로그인을 요청한다.<br>
        '
        #swagger.tags = ['couple']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                waitingId: 0,
                toUID: '',
                fromUID: '',
            }
        }
    */
    const db = require(`${path}/mysql2`);
    const io = require(`${path}/bin/www`)["io"];
    let user_dict = require(`${path}/app`)["user_dict"];
    let error = new Object();
    let waitingId = req.body.waitingId;
    let toUID = req.body.toUID;
    let fromUID = req.body.fromUID;
    if(!toUID || !fromUID) {
        return res.json({
            success: 0,
            message: "잘못된 정보거나 로그인이 잘못되었습니다. 확인 후 다시 시도하세요.",
        });
    }

    let [results] = await db.query(`
        insert into coupleInfos 
        (toUID, fromUID, image, backgroundImageElement, backgroundImageUrl, dateAdded, status)
        values
        (?, ?, ?, ?, ?, ?, ?)
    `, [toUID, fromUID, '', '', '', new Date(), 1])

    let coupleInfoId = results.insertId;

    /* chatInfo 생성 */
    let [chatInfo_results] = await db.query(`
        insert into chatInfos (title, type, status, dateAdded)
        values(?, ?, ?, ?)
    `, ['', 'couple', 1, new Date()]);
    let chatInfoId = chatInfo_results.insertId;

    /* chatMembers 생성 */
    await db.query(`
    insert into chatMembers (chatInfoId, UID, isHost, dateAdded)
    values(?, ?, ?, ?)
    `, [chatInfoId, toUID, 0, new Date()]);
    await db.query(`
    insert into chatMembers (chatInfoId, UID, isHost, dateAdded)
    values(?, ?, ?, ?)
    `, [chatInfoId, fromUID, 0, new Date()]);

    /* appUsers의 coupleInfo 변경 */
    await db.query(`
        update appUsers
        set coupleInfoId=?, coupleUID=?
        where UID=?
    `, [coupleInfoId, fromUID, toUID]);

    /* appUsers의 coupleInfo 변경 */
    await db.query(`
        update appUsers
        set coupleInfoId=?, coupleUID=?
        where UID=?
    `, [coupleInfoId, toUID, fromUID]);

    /* coupleInfoId에 default-schedule-classifications 을 등록한다. */
    await db.query(`
        insert into coupleScheduleClassifications (coupleInfoId, title, color, status, dateAdded)
        values ?
    `, [
            [
                [coupleInfoId, '기념일', '#ff4040', 1, new Date()],
                [coupleInfoId, '여행', '#f22ef2', 1, new Date()],
                [coupleInfoId, '데이트', '#5b79f5', 1, new Date()],
            ]
    ]);

    let [rows] = await db.query(`
        select 
            u.userId, u.UID, u.phoneNumber, u.image, u.userName, u.coupleInfoId,
            ci.backgroundImageElement, ci.backgroundImageUrl
        from appUsers as u 
        join coupleInfos as ci on u.coupleInfoId=ci.coupleInfoId
        where u.UID=? and ci.status=1
    `, [toUID]);
    let couple = rows[0];

    await db.query(`
        DELETE FROM waitings
        WHERE waitingId=?
    `, [waitingId]);

    try {
        io.to(user_dict[toUID].socketId).emit(`/client/user/couple/put`);
        io.to(user_dict[fromUID].socketId).emit(`/client/user/couple/put`);
    } catch(err) {
        console.log("err:", err);
    }

    return res.json({
        success: 1,
        couple,
        message: '커플 등록 완료!'
    });
});

module.exports = router;
