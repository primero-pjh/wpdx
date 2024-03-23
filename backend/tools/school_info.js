const axios = require('axios');
require('dotenv').config({ path: "../.env" });
const mysql = require('mysql2/promise');

let db = null;


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

axios.get("https://open.neis.go.kr/hub/schoolInfo", {
    params: {
        KEY: "c6f34188b926429998507e1c6bc14aab",
        Type: 'json',
        ATPT_OFCDC_SC_CODE: "C10",
        pSize: 1000,
    }
}).then(async (res) => {
    let data = res.data;
    let rows = data.schoolInfo[1]['row'];
    await db.query(`
        INSERT INTO datasets (keyword, value)
        VALUES (?, ?)
    `, ['schoolInfo', JSON.stringify(rows)]);

    process.exit()
}).catch((err) => {
    console.log("err:", err);
    process.exit()
});