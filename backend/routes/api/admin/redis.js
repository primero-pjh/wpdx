const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const knex = require(`${path}/db`);
const cfg = require(`${path}/config`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

/* 
    admin의 login controller
*/
router.get('/api/admin/redis', async (req, res, next) => {
    let redisCli = require(`${path}/bin/www`)["redisCli"];
    let redis = await redisCli.keys('*');

    return res.json({
        success: 1,
        redis,
    });
});

module.exports = router;
