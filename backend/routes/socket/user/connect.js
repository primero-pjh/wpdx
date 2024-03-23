let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);

module.exports = function(socket) {
    socket.on("/socket/user/connect", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        // console.log("data:", data);
        
        user_dict[data.UID].socketId = socket.id;

        /* 로그인을 한 유저가 커플이 등록이 되어있을 때 */
        if(user_dict[data.UID].hasOwnProperty('couple')) {
            let coupleUID = user_dict[data.UID].couple.UID;
            /* 커플이 접속한 경우 커플의 couple에 나의 socketId 등록 */
            if(user_dict.hasOwnProperty(coupleUID)) {
                try {
                    user_dict[coupleUID].couple.socketId = socket.id;
                    io.to(user_dict[data.UID].couple.socketId).emit(`/client/couple/login`, {
                        coupleSocketId: socket.id,
                    });
                } catch(e) {
                    console.log(e);
                }
            }
        }

        console.log("user_dict:", user_dict);

        return callback({
            success: 1,
        });
    });
};