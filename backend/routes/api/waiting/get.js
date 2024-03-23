const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

/* 
    
*/
router.get('/api/waiting', async (req, res, next) => {
    /*
        #swagger.description = '해당 유저의 신청(요청)목록을 모두 들고오는 API'
        #swagger.tags = ['waiting']
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                
            }
        }
    */
    let user_dict = require(`${path}/app`)["user_dict"];
    const db = require(`${path}/mysql2`);
    
    let UID = req.query.UID;
    let [to_user_list, fields1] = await db.query(`
        select 
            w.*,
            to_user.userName as toUserName,
            from_user.userName as fromUserName
        from waitings as w
        join appUsers as to_user on w.toUID=to_user.UID
        join appUsers as from_user on w.fromUID=from_user.UID
        where w.toUID=?
    `, [UID]);

    let [from_user_list, fields2] = await db.query(`
        select 
            w.*,
            to_user.userName as toUserName,
            from_user.userName as fromUserName
        from waitings as w
        join appUsers as to_user on w.toUID=to_user.UID
        join appUsers as from_user on w.fromUID=from_user.UID
        where w.fromUID=?
    `, [UID]);

    return res.json({
        success: 1,
        to_user_list,
        from_user_list,
    });
});

module.exports = router;
