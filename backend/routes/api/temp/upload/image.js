const express = require('express');
const fs = require('fs');
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
        /* directory 경로가 없으면 생성 */
        let dir = `${path}/public/temp/images`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, 'public/temp/images');
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split(".")[1];
        let uuid = v4();
        cb(null, `${uuid}.${ext}`);
    },
});
  
const upload = multer({ storage: storage });

/* image: 임시저장 */
router.post('/api/temp/upload/image', upload.single('file'), async function(req, res, next) {
    let token = req.body.token;
    let file = req.file;
    let info = await jwtFunc.verify(token);
    if(!info) {
        return res.json({
            success: 0,
            message: '토큰이 올바르지 않습니다.',
        });
    }

    let path = `/temp/images/${file.filename}`;
    
    return res.json({
        success: 1,
        path: path
    });
});

module.exports = router;
