const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
let CRT_ERROR_CODE = require(`${path}/error_code`);
const { v4 } = require('uuid');
const fs = require('fs');
const multer = require('multer');
const rimraf = require('rimraf');

let is_delete = false;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let coupleInfoId = req.params.coupleInfoId;
        let coupleAlbumId = req.params.coupleAlbumId;
        let dir = `${path}/public/images/${coupleInfoId}/albums/${coupleAlbumId}`;
        if (!is_delete && fs.existsSync(dir)) {
            rimraf.sync(dir);
            is_delete = true;
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split(".")[1];
        let uuid = v4();
        let url = `${uuid}.${ext}`;
        cb(null, url);
    },
});
  
const upload = multer({ storage: storage });

router.put('/api/couple/:coupleInfoId/albums/:coupleAlbumId/images', upload.array('files', 10), async (req, res, next) => {
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
    let coupleAlbumId = req.params.coupleAlbumId;
    // 앨범 dir 생성
    let files = req.files;
    await db.query(`
        delete from albumImages
        where coupleAlbumId=?
    `, [coupleAlbumId]);

    for(let i=0; i<files.length; i++) {
        let url = `/images/${coupleInfoId}/albums/${coupleAlbumId}/${files[i].filename}`;
        if(i == 0) {
            await db.query(`
                update coupleAlbums
                set coverImageUrl=?
                where coupleAlbumId=?
            `, [url, coupleAlbumId]);
        } else {
            
            await db.query(`
                insert into albumImages (coupleAlbumId, imageUrl, body, status, sortOrder, dateAdded)
                values (?, ?, ?, ?, ?, ?)
            `, [coupleAlbumId, url, '', 1, i, new Date()]);
        }
    }
    
    return res.json({
        success: 1,
        message: '앨범 추가 완료!',
    });
});

module.exports = router;
