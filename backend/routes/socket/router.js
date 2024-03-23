let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);
const jwtFunc = require(`${path}/jwt`);
module.exports = function(socket) {
    socket.on("/socket/router", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        const auth = socket.handshake.auth;
		let user = await jwtFunc.verify(auth.token);
        
        let coupleSocketId = user_dict[user.UID].couple.socketId;
        io.to(coupleSocketId).emit('/client/router', data);
    });
};