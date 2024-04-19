const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;

const router = express.Router();
/* 
    
*/
const knex = require('knex')({
    client: 'mssql',
    connection: {
        user: 'sa',
        password: 'hamoedu2277*B',
        server: 'localhost',
        database: 'lms',
        port: 1433,
    }
});

router.get('/api/lms/student/name/:StudentName', async (req, res, next) => {
    let StudentName = req.params.StudentName;
    let rows = await knex.raw(`
        SELECT u.UID, u.DisplayName as StudentName, sp.SchoolName, sp.SchoolGrade, sp.SchoolLevel, c.CenterName
        FROM ApplicationUsers as u
        JOIN StudentProfiles as sp on u.UID=sp.UID
        JOIN Centers as c on u.CenterId=c.CenterId
        where u.DisplayName = ?
    `, [StudentName]);
    
    return res.json({
        success: 1,
        rows,
    })
});

module.exports = router;
