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

router.get('/api/lms', async (req, res, next) => {
    let rows = await knex.raw(`
        SELECT u.CenterId, sp.SchoolLevel, sp.SchoolGrade, sp.SchoolName, COUNT(*) AS count
        FROM ApplicationUsers AS u 
        JOIN StudentProfiles AS sp ON u.UID = sp.UID
        WHERE u.UID IN (
            SELECT cs.StudentUID
            FROM CourseStudents AS cs
            JOIN CourseTags AS ct ON cs.CourseTagId = ct.CourseTagId
            JOIN CourseGroups AS cg ON ct.CourseGroupId = cg.CourseGroupId
            WHERE ct.CenterId IN (14, 15, 16) AND cg.Title != N'대기그룹' AND cs.NewDate <= '2024-03-23' AND 
                (
                    (cs.ScheduledDeleteDate IS NULL OR cs.ScheduledDeleteDate = '')
                    or
                    (
                        (cs.ScheduledDeleteDate IS NOT NULL AND cs.ScheduledDeleteDate != '') 
                        and
                        (cs.ScheduledDeleteDate >= '2024-03-23')
                    )
                )
            GROUP BY cs.StudentUID
        )
        GROUP BY u.CenterId, sp.SchoolLevel, sp.SchoolGrade, sp.SchoolName
        ORDER BY u.CenterId, sp.SchoolGrade
    `, []);
    
    return res.json({
        success: 1,
        rows,
    })
});

module.exports = router;
