const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
let CRT_ERROR_CODE = require(`${path}/error_code`);
const { v4 } = require('uuid');
const fs = require('fs');

router.put('/api/couple/:coupleInfoId/albums/:coupleAlbumId', async (req, res, next) => {
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
    let title = req.body.title;
    let body = req.body.body;
    let imageCount = parseInt(req.body.imageCount);

    let error = new Object();

    if(!title) {
        error["title"] = "필수입력 항목입니다.";
    }
    if(imageCount == 0) {
        error["imageList"] = "최소한 1개의 이미지가 필요합니다.";
    } else if (imageCount > 10) {
        error["imageList"] = "이미지는 최대 10개까지 업로드가 가능합니다.";
    }

    if(Object.keys(error).length > 0) {
        return res.json({
            success: 0,
            error,
        });
    }

    let [results] = await db.query(`
        update coupleAlbums 
        set title=?, body=?
        where coupleAlbumId=?
    `, [title, body, coupleAlbumId]);
    
    return res.json({
        success: 1,
        message: '앨범 수정 완료!',
    });
});

module.exports = router;
