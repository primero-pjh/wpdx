const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;

const router = express.Router();
/* 
    
*/
router.post('/api/schoolInfos/lat/long', async (req, res, next) => {
    const db = require(`${path}/mysql2`);

    let data = req.body.data;

    for(let i=0; i<data.length; i++) {
        await db.query(`
            INSERT INTO school (SCHUL_NM, SD_SCHUL_CODE, ORG_RDNMA, ORG_TELNO, HMPG_ADRES, latitude, longitude)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            data[i].SCHUL_NM,
            data[i].SD_SCHUL_CODE,
            data[i].ORG_RDNMA,
            data[i].ORG_TELNO,
            data[i].HMPG_ADRES,
            data[i].latitude,
            data[i].longitude,
        ]);
    }
    
    return res.json({
        success: 1,
    });
});

module.exports = router;
