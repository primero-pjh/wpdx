let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);
let knex = require(`${path}/db`);
module.exports = function(socket) {
    socket.on("/socket/couple/request/confirm", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        let error = new Object();
        if(!data.isConfirm) {
            io.to(user_dict[data.otherPhone].socketId).emit("/client/couple/request/confirm", {
                success: 0,
            });
            return callback({
                success: 1,
            });
        }
        if(!data.myPhone || !data.otherPhone) {
            return callback({
                success: 0,
                code: "LOGIN_ERROR",
                message: CRT_ERROR_CODE["LOGIN_ERROR"],
            });
        }

        let coupleInfoId = await knex.table("coupleInfos").insert({
            fromUID: data.myPhone,
            toUID: data.otherPhone,
            dateAdded: new Date(),
        });

        await knex.table("appUsers").where("phoneNumber", data.myPhone).update({
            spousePhoneNumber: data.otherPhone,
            coupleInfoId: coupleInfoId,
        });
        await knex.table("appUsers").where("phoneNumber", data.otherPhone).update({
            spousePhoneNumber: data.myPhone,
            coupleInfoId: coupleInfoId,
        });

        let couple = await knex.table('appUsers as u')
            .select('u.userId', 'u.UID', 'u.spousePhoneNumber', 'u.phoneNumber', 'u.image', 'u.coupleInfoId',
            'u.userName')
            .where('phoneNumber', data.otherPhone).first();

        let socketId = user_dict[data.otherPhone].socketId;
        let coupleSocketId = user_dict[data.myPhone].socketId;
        io.to(socketId).emit("/client/couple/request/confirm", {
            success: 1,
            couple: couple,
            coupleSocketId: coupleSocketId,
        });

        coupleSocketId = user_dict[data.otherPhone].socketId;
        return callback({
            success: 1,
            couple: couple,
            coupleSocketId: coupleSocketId,
        });
    });
};