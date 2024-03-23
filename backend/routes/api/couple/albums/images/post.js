const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
let CRT_ERROR_CODE = require(`${path}/error_code`);
const { v4 } = require('uuid');
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let coupleInfoId = req.params.coupleInfoId;
        let albumId = req.params.albumId;
        let dir = `${path}/public/images/${coupleInfoId}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        dir += '/albums';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        dir += `/${albumId}`;
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

router.post('/api/couple/:coupleInfoId/albums/:albumId/images', upload.array('files', 10), async (req, res, next) => {
    /*
        #swagger.description = '특정 커플의 앨범을 저장하는 API'
        #swagger.tags = ['/couple']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                coupleInfoId: 0,
                backgroundImage: 0,
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];

    let coupleInfoId = req.params.coupleInfoId;
    let albumId = req.params.albumId;
    // 앨범 dir 생성
    let files = req.files;
    for(let i=0; i<files.length; i++) {
        let url = `/images/${coupleInfoId}/albums/${albumId}/${files[i].filename}`;
        if(i==0) {
            await db.query(`
                update coupleAlbums
                set coverImageUrl=?
                where coupleAlbumId=?
            `, [url, albumId]);
        } else {
            await db.query(`
                insert into albumImages (coupleAlbumId, imageUrl, body, status, sortOrder, dateAdded)
                values (?, ?, ?, ?, ?, ?)
            `, [albumId, url, '', 1, i, new Date()]);
        }
    }
    
    return res.json({
        success: 1,
        message: '앨범 추가 완료!',
    });
});

module.exports = router;
