const express = require('express');
let appRoot = require("app-root-path");
let path = appRoot.path;
const router = express.Router();
const cfg = require(`${path}/config`);
let CRT_ERROR_CODE = require(`${path}/error_code`);

router.get('/api/couple/:coupleInfoId/albums/images', async (req, res, next) => {
    /*
        #swagger.description = '특정 커플의 모든 앨범에 해당하는 이미지들을 들고오는 API'
        #swagger.tags = ['couple']
        #swagger.summary = 'token*'
        #swagger.parameters['params'] = {
            in: 'params',
            schema: {
                coupleInfoId: 0,
            }
        }
    */
    const db = require(`${path}/mysql2`);
    let user_dict = require(`${path}/app`)["user_dict"];
    let coupleInfoId = req.params.coupleInfoId;
    if(!coupleInfoId) {
        return res.json({
            success: 0,
            isLogged: false,
        });
    }

    let [image_list, fields] = await db.query(`
        select img.*
        from albumImages as img
        join coupleAlbums as ca on img.coupleAlbumId=ca.coupleAlbumId
        where ca.coupleInfoId=? and ca.status=? and img.status=?
        order by img.sortOrder asc
    `, [coupleInfoId, 1, 1]);
    
    return res.json({
        success: 1,
        image_list,
    });
});

module.exports = router;
