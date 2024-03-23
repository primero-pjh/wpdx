let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);

module.exports = function(socket) {
    socket.on("/socket/chat/event/focus", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        
        io.to(data.socketId).emit(`/client/chat/event/focus`);
        
    });

    socket.on("/socket/chat/event/blur", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        
        io.to(data.socketId).emit(`/client/chat/event/blur`);
    });
};