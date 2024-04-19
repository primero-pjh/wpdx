const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;

const tf = require('@tensorflow/tfjs');

const router = express.Router();
const axios = require('axios');
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

router.get('/api/keras/pre', async (req, res, next) => {
    let data = req.query;
    console.log("data:", data);

    axios.get(`http://192.168.222.228:5000/ai/pre`, {
        params: {
            data
        }
    }).then((response) => {
        return res.json({
            success: 1,
            value: response.data
        })
    }).catch((err) => {
        console.error(err);
        return res.json({
            success: 0,
        })
    });
});

module.exports = router;
