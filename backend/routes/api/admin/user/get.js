const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

/* 
    admin의 login controller
*/
router.get('/api/admin/user', async (req, res, next) => {
    let user_dict = require(`${path}/app`)["user_dict"];
    const db = require(`${path}/mysql2`);
    
    let [user_list, fields] = await db.query(`
        select 
            u.UID, u.userId, u.userName, u.email, u.phoneNumber, 
            u.coupleInfoId, u.dateAdded,
            u.status
        from appUsers as u
        where u.status=?
    `, [1]);

    return res.json({
        success: 1,
        user_list
    });
});

module.exports = router;
