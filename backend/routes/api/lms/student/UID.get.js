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

router.get('/api/lms/student/:UID', async (req, res, next) => {
    let UID = req.params.UID;
    let rows = await knex.raw(`
        SELECT u.UID, u.CenterId, u.DisplayName as StudentName, sp.SchoolName, sp.SchoolGrade, sp.SchoolLevel, sp.StudentGrade, 
            u.Address, u.Address2, sp.StudentStatus, cs.cs_count, 
            cs.max_sche_date, 
            (
                SELECT COUNT(*)
                FROM Counsels AS csl
                WHERE csl.StudentUID=u.UID AND csl.CounselType = 'withdraw' AND (csl.CounselDate >= '2023-01-01' AND csl.CounselDate <= '2023-12-31')
            ) AS withdraw_csl_count,
            (
                SELECT COUNT(*)
                FROM Counsels AS csl
                WHERE csl.StudentUID=u.UID AND csl.CounselType != 'withdraw' AND (csl.CounselDate >= '2023-01-01' AND csl.CounselDate <= '2023-12-31')
            ) AS remain_csl_count,
            (
                SELECT COUNT(*)
                FROM LectureStudents AS ls
                WHERE ls.StudentUID=u.UID AND ls.LectureType = 2 AND (ls.SupplyDate >= '2023-01-01' AND ls.SupplyDate <= '2023-12-31')
            ) AS supply_count,
            (
                SELECT COUNT(*)
                FROM LectureStudents AS ls
                WHERE ls.StudentUID=u.UID AND ls.LectureType = 3 AND (ls.SupplyDate >= '2023-01-01' AND ls.SupplyDate <= '2023-12-31')
            ) AS clinic_count,
            (
                SELECT COUNT(*)
                FROM LectureStudents AS ls
                WHERE ls.StudentUID=u.UID AND (ls.LectureDate >= '2023-01-01' AND ls.LectureDate <= '2023-12-31') AND ls.AttendanceStatus = 'absence'
            ) AS abs_count,
            (
                SELECT COUNT(*)
                FROM LectureStudents AS ls
                WHERE ls.StudentUID=u.UID AND (ls.LectureDate >= '2023-01-01' AND ls.LectureDate <= '2023-12-31') AND ls.AttendanceStatus = 'attendance'
            ) AS pre_count
        FROM ApplicationUsers AS u
        JOIN StudentProfiles AS sp ON u.UID = sp.UID
        JOIN (
            SELECT cs.StudentUID, COUNT(*) AS cs_count, MAX(cs.ScheduledDeleteDate) AS max_sche_date
            FROM CourseStudents AS cs
            JOIN CourseTags AS ct ON cs.CourseTagId = ct.CourseTagId
            JOIN CourseGroups AS cg ON ct.CourseGroupId = cg.CourseGroupId
            WHERE cg.Title != N'대기그룹' AND cs.NewDate >= '2023-01-01'
            GROUP BY cs.StudentUID
        ) AS cs ON u.UID = cs.StudentUID
        WHERE u.UID = ?
        ORDER BY u.UID asc
    `, [UID]);
    
    return res.json({
        success: 1,
        rows: rows[0],
    })
});

module.exports = router;
