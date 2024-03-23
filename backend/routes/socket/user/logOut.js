let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);
const jwtFunc = require(`${path}/jwt`);
module.exports = function(socket) {
    socket.on("/socket/user/logOut", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        const auth = socket.handshake.auth;
		let user = await jwtFunc.verify(auth.token);
        let key = user.UID;
        let socketId = socket.id;
        let coupleSocketId = data.coupleSocketId;

        io.to(coupleSocketId).emit('/client/couple/logOut');
        delete user_dict[key];
    });
};