const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;

const router = express.Router();
/* 
    
*/
router.get('/api/dx/23_middle_student', async (req, res, next) => {
    const db = require(`${path}/mysql2`);

    let [rows, field] = await db.query(`
        SELECT *
        FROM 23_middle_student
    `, []);
    return res.json({
        success: 1,
        rows,
    });
});

module.exports = router;
