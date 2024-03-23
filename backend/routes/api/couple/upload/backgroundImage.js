const express = require('express');
const fs = require(`fs`);
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const knex = require(`${path}/db`);
const cfg = require(`${path}/config`);
const jwtFunc = require(`${path}/jwt`);
let CRT_ERROR_CODE = require(`${path}/error_code`);
const { v4 } = require('uuid');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let coupleInfoId = req.params.coupleInfoId;
        let dir = `${path}/public/images/${coupleInfoId}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        dir += '/backgroundImages';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split(".")[1];
        let uuid = v4();
        cb(null, `${uuid}.${ext}`);
    },
});
  
const upload = multer({ storage: storage });

router.post('/api/couple/:coupleInfoId/upload/backgroundImage', upload.single('file'), async function(req, res, next) {
    /*
        #swagger.description = '커플의 배경 이미지를 변경하는 API'
        #swagger.tags = ['couple']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                coupleInfoId: 0,
            }
        }
    */
    let user_dict = require(`${path}/app`)["user_dict"];
    const db = require(`${path}/mysql2`);
    let io = require(`${path}/bin/www`)["io"];
    let coupleInfoId = req.params.coupleInfoId;
    let file = req.file;

    let url = `/images/${coupleInfoId}/backgroundImages/${file.filename}`;
    await db.query(`
        update coupleInfos
        set backgroundImageUrl=?
        where coupleInfoId=?
    `, [url, coupleInfoId]);

    return res.json({
        success: 1,
        filename: file.filename,
    });
});

module.exports = router;
