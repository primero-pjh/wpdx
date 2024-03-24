const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;

const router = express.Router();
/* 
    
*/
router.get('/api/datasets/schoolInfo', async (req, res, next) => {
    const db = require(`${path}/mysql2`);

    let keyword = req.params.keyword;

    let [rows, field] = await db.query(`
        SELECT *
        FROM datasets
        WHERE keyword=?
    `, ['schoolInfo']);
    return res.json({
        success: 1,
        rows: rows[0]?.value,
    })
});

module.exports = router;
