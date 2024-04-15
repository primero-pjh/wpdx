const axios = require('axios');
require('dotenv').config({ path: "../.env" });
const mysql = require('mysql2/promise');

let db = null;
const knex = require('knex')({
    client: 'mssql',
    connection: {
        server : 'localhost',
        user : 'sa',
        password : 'hamoedu2277*B',
        database : 'LMS',
        options: {
            port: 1433
        }
    }
});

const loading = async () => {
    db = await mysql.createPool({
        host: process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : "WPDX",
        port: 3306,
        multipleStatements: true // allows to use multiple statements
    });
    module.exports = db;
}
loading();

async function init_student() {
    let user_list = await knex.raw(`
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
        WHERE sp.StudentGrade IN (15, 16, 17) AND u.CenterId != 3
        ORDER BY u.UID asc
    `, []);
    db.query(`DELETE FROM 23_middle_student`);

    for(let i = 0; i < user_list.length; i++) {
        let user = user_list[i];
        let target = 0;
        if(user.max_sche_date) {
            if(user.max_sche_date >= '2024-01-01') { target = 1; }
        } else {
            target = 1;
        }

        db.query(`
            INSERT INTO 23_middle_student 
            (UID, CenterId, StudentName, SchoolName, SchoolGrade, SchoolLevel, StudentGrade, Address, Address2, StudentStatus, cs_count, max_sche_date, 
                withdraw_csl_count, remain_csl_count, supply_count, clinic_count, abs_count, pre_count, target)
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                ?, ?, ?, ?, ?, ?, ?)
        `, [
            user.UID,
            user.CenterId,
            user.StudentName,
            user.SchoolName,
            user.SchoolGrade,
            user.SchoolLevel,
            user.StudentGrade,
            user.Address,
            user.Address2,
            user.StudentStatus,
            user.cs_count,
            user.max_sche_date,
            user.withdraw_csl_count,
            user.remain_csl_count,
            user.supply_count,
            user.clinic_count,
            user.abs_count,
            user.pre_count,
            target
        ]);
    }
}

init_student();


