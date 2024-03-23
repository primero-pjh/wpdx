let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);

module.exports = function(socket) {
    socket.on("/socket/user/message/get_all", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        let redisCli = require(`${path}/bin/www`)["redisCli"];

        if(!data.user.socketId) {
            return callback({
                success: 0,
                code: "SOCKET",
                message: CRT_ERROR_CODE["SOCKET"],
            });
        }
        if(!data.user.phoneNumber) {
            return callback({
                success: 0,
                code: "LOGIN_ERROR",
                message: CRT_ERROR_CODE["LOGIN_ERROR"],
            });
        }

        let message_list = await redisCli.get(`/${data.user.coupleInfoId}`);
        if(!message_list) {
            await redisCli.set(`/${data.user.coupleInfoId}`, JSON.stringify([]));
        }
        message_list = JSON.parse(await redisCli.get(`/${data.user.coupleInfoId}`));
        return callback({
            success: 1,
            message_list: message_list,
        });
    });
};