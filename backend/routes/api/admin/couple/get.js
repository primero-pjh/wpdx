const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

/* 
    
*/
router.get('/api/admin/couple', async (req, res, next) => {
    let user_dict = require(`${path}/app`)["user_dict"];
    const db = require(`${path}/mysql2`);
    
    let [rows, fields] = await db.query(`
        select 
            c_info.coupleInfoId, c_info.dateAdded,
            to_user.userName as toUserName, 
            from_user.userName as fromUserName
        from coupleInfos as c_info
        join appUsers as to_user on c_info.toUID=to_user.UID
        join appUsers as from_user on c_info.fromUID=from_user.UID
        where c_info.status=1
    `, []);

    return res.json({
        success: 1,
        couple_list: rows,
    });
});

module.exports = router;
