let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);

module.exports = function(socket) {
    socket.on("/socket/admin/shutdown", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        let error = new Object();

        if(user_dict.hasOwnProperty(data.key) == false) { 
            callback({
                success: 0,
                message: "해당 유저는 접속중이지 않습니다."
            });
            return;
        }
        io.to(user_dict[data.key].socketId).emit(`disconnected`);

        callback({
            success: 1,
        });
        return;
    });
};