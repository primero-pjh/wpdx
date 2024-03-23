const fs = require('fs');
let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);
const knex = require(`${path}/db`);

module.exports = function(socket) {
    socket.on("/socket/community/save/*", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        let error = new Object();

        if(data.coupleInfoId == 0) {
            return io.to(socket.id).emit('/error', {
                success: 0,
                code: "COUPLE_EMPTY_ERROR",
                message: CRT_ERROR_CODE["COUPLE_EMPTY_ERROR"],
            });
        }
        if(!data.body) {
            error["body"] = "필수입력 항목입니다.";
        }
        if(!data.imageList) {
            error["imageList"] = "필수입력 항목입니다.";
        }
        if(Object.keys(error).length > 0) {
            return callback({
                success: 0,
                error: error,
            });
        }

        let communityId = await knex.table("communities").insert({
            coupleInfoId: data.coupleInfoId,
            body: data.body,
            imageList: '',
            tags: '',
            isPublish: data.isPublish,
            likes: 0,
            comments: 0,
            dateAdded: new Date(),
        })[0];
        console.log("communityId:", communityId);
        /* tags */
        let tagList = [];
        let tags = data.tags.split(",");
        tags.map(async (key) => {
            tagList.push(key);
            let tag = await knex.table("tags").where("tagName", key).first();
            if(!tag) {
                let tagId = await knex.table("tags").insert({
                    tagName: x,
                })[0];
                await knex.table("cmuRefTags").insert({
                    tagId: tagId,
                    communityId: communityId,
                });
            }
        });
        await knex.table("communities").where("communityId", communityId).update({
            tags: tagList.join(" "),
        });
        /* images */

        let image_list = data.imageList.split(",");
        for(let i=0; i<image_list.length; i++) {
            let save_image_path = `${path}${image_list[i]}`
            console.log("save_image_path:", save_image_path);
            if(fs.existsSync(image_list)) {
                fs.rename(image_old_path, image_new_path, function (err) {
                    if (err) { throw err;}
                });
            }
        }

        let dir = `${path}/wwwroot/community/${communityId}/images`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        
        

        
       
        return callback({
            success: 1,
            message: '성공적으로 추가하였습니다.'
        });
    });
};