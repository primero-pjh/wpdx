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
        let UID = req.params.UID;
        let dir = `public/images/users/${UID}`;
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split(".")[1];
        let uuid = v4();
        cb(null, `${uuid}.${ext}`);
    },
});
  
const upload = multer({ storage: storage });

router.post('/user/:UID/upload/profile_image', upload.single('file'), async function(req, res, next) {
    /*
        #swagger.description = '해당 파일을 저장하는 API'
        #swagger.tags = ['user']
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                params: {
                    file: null,
                }
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    let io = require(`${path}/bin/www`)["io"];
    let UID = req.params.UID;
    let file = req.file;
    let filename = file.filename;
    let url = `/images/users/${UID}/${filename}`;
    await db.query(`
        update appUsers
        set image=?
        where UID=?
    `, [url, UID]);
    
    return res.json({
        success: 1,
    });
});

module.exports = router;
