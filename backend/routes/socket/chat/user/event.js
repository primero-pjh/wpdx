let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);

module.exports = function(socket) {
    socket.on("/socket/chat/user/event", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];

        let type = data.type;
        if(type == 'focus') {
            io.to(data.coupleSocketId).emit("/client/chat/user/event/watch", {
                type,
            });
        } else if (type == 'blur') {
            io.to(data.coupleSocketId).emit("/client/chat/user/event/watch", {
                type,
            });
        }
        
        return callback({
            success: 1,
        });
    });
};