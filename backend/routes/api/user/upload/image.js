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
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split(".")[1];
        let uuid = v4();
        cb(null, `${uuid}.${ext}`);
    },
});
  
const upload = multer({ storage: storage });

/* GET users listing. */
router.post('/api/user/upload/image', upload.single('file'), async function(req, res, next) {
    /*
        #swagger.description = '사용자의 프로필 이미지를 업로드하는 API'
        #swagger.tags = ['user']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                coupleInfoId: 0,
                file: 'file',
            }
        }
    */
    let user_dict = require(`${path}/app`)["user_dict"];
    let io = require(`${path}/bin/www`)["io"];

    let token = req.body.token;
    let coupleInfoId = req.body.coupleInfoId;
    let file = req.file;
    let info = await jwtFunc.verify(token);
    if(!info) {
        return res.json({
            success: 0,
            message: '토큰이 올바르지 않습니다.',
        });
    }

    /* directory 경로가 없으면 생성 */
    let dir = `${path}/public/images/${info.UID}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    let image_old_path = `${path}/public/images/${file.filename}`;
    let image_new_path = `${path}/public/images/${info.UID}/${file.filename}`;
    let db_img_path = `/images/${info.UID}/${file.filename}`;
    fs.rename(image_old_path, image_new_path, function (err) {
        if (err) { throw err;}
    });

    await knex.table("appUsers").where("UID", info.UID).update({
        image: db_img_path
    });

    io.to(`/${coupleInfoId}`).emit("/client/profile/change/image", {
        success: 1,
        message: '이미지 변경!',
        image_path: db_img_path,
    });
    
    return res.json({
        success: 1,
        message: '이미지 변경!',
        image_path: db_img_path,
    });
});

module.exports = router;
