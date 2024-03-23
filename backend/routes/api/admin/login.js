const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const knex = require(`${path}/db`);
const cfg = require(`${path}/config`);
const jwt = require('jsonwebtoken');
let CRT_ERROR_CODE = require(`${path}/error_code`);

/* 
    admin의 login controller
*/
router.get('/api/admin/login', async function(req, res, next) {
    let user_dict = require(`${path}/app`)["user_dict"];
    let userId = req.query.userId;
    let password = req.query.password;
    let rememberMe = req.query.rememberMe;
    
    let error = new Object();
    if(!userId) { error["userId"] = "필수입력 항목입니다!"; }
    if(!password) { error["password"] = "필수입력 항목입니다!"; }
    if(Object.keys(error).length > 0) {
        return res.json({
            success: 0,
            error: error,
        });
    }

    let user = await knex.table('appUsers as u')
        .select('u.userId', 'u.UID', 'u.spousePhoneNumber', 'u.phoneNumber', 'u.image', 'u.userName',
            'u.isAdmin')
        .where("u.userId", userId)
        .andWhere("u.password", password).first();

    /* user null check */
    if(!user) {
        error["userId"] = "해당 아이디는 존재하지 않습니다.";
        error["password"] = "해당 아이디는 존재하지 않습니다.";
        return res.json({
            success: 0,
            error,
        });
    }
    if(user.isAdmin == 0) {
        return res.json({
            success: 0,
            message: "admin 권한이 없습니다."
        });    
    }
    
    let token = null;
    if(rememberMe == 1) {
        token = jwt.sign({ 
            userId: userId,
        }, 
        cfg.jwtKey, 
        {
            expiresIn: "1 days",
        });
        res.cookie('token', token);
    }

    return res.json({
        success: 1,
        user,
        token,
    });
});

module.exports = router;
