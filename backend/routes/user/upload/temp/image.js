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
        cb(null, 'public/images/temp/profile_image');
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split(".")[1];
        let uuid = v4();
        cb(null, `${uuid}.${ext}`);
    },
});
  
const upload = multer({ storage: storage });

router.post('/user/upload/temp/image', upload.single('file'), async function(req, res, next) {
    let user_dict = require(`${path}/app`)["user_dict"];
    let io = require(`${path}/bin/www`)["io"];

    let token = req.body.token;
    let coupleInfoId = req.body.coupleInfoId;
    let file = req.file;

    let image_new_path = `/images/temp/profile_image/${file.filename}`;
    
    return res.json({
        success: 1,
        filename: file.filename,
        path: image_new_path,
    });
});

module.exports = router;
