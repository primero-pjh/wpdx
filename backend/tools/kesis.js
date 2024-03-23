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

let apiKey = process.env.KOSIS_API_KEY;
let url_list = [
    `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${apiKey}&itmId=T01+T02+T03+T04+&objL1=ALL&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&newEstPrdCnt=1&orgId=101&tblId=DT_1PE101_2`,
    `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${apiKey}&itmId=T01+T02+T03+T04+&objL1=ALL&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&newEstPrdCnt=1&orgId=101&tblId=DT_1PE102_2`,
    `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${apiKey}&itmId=T01+T02+T03+T04+&objL1=ALL&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&newEstPrdCnt=1&orgId=101&tblId=DT_1PE105_2`,
    `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${apiKey}&itmId=T01+T02+T03+T04+&objL1=ALL&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&newEstPrdCnt=1&orgId=101&tblId=DT_1PE107_2`,
    `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${apiKey}&itmId=T0+T1+T2+T3+T4+T5+&objL1=ALL&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&newEstPrdCnt=1&orgId=101&tblId=DT_1PE308`,
    `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${apiKey}&itmId=T0+T01+T11+T1+T2+T3+T4+T5+T6+T7+T8+T9+T10+&objL1=ALL&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&newEstPrdCnt=1&orgId=101&tblId=DT_1PE309`,
    `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${apiKey}&itmId=T01+T02+T03+T04+T05+T06+T07+&objL1=ALL&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&newEstPrdCnt=3&orgId=101&tblId=DT_1PE406`,
];

for(let i=0; i<url_list.length; i++) {
    let url = url_list[i];
    axios.get(url, {
    }).then(async (res) => {
        let data = res.data;
        await db.query(`
            INSERT INTO datasets (keyword, value, description)
            VALUES (?, ?, ?)
        `, [data[0].TBL_ID, JSON.stringify(data), data[0].TBL_NM]);
    }).catch((err) => {
        console.log("err:", err);
    });
}