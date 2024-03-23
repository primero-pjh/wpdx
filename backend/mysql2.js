require('dotenv').config();
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