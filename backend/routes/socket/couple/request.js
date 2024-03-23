let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);

module.exports = function(socket) {
    socket.on("/socket/couple/request", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        let error = new Object();
        if(!data.user.socketId) {
            return callback({
                success: 0,
                code: "SOCKET",
                message: CRT_ERROR_CODE["SOCKET"],
            });
        }

        /* error check */
        if(!data.phoneNumber) {
            error["phoneNumber"] = "필수입력 항목입니다.";
        }
        /* 자기 자신에게 한 경우 */
        if(data.phoneNumber == data.user.phoneNumber) {
            error["phoneNumber"] = "자기 자신에겐 신청할 수 없습니다.";
        }
        /* 접속중이지 않을 경우 */
        if(!user_dict[data.phoneNumber]) {
            error["phoneNumber"] = "현재 접속 중이지 않거나, \n존재하지 않는 번호입니다.";
        }
        if(Object.keys(error).length > 0) {
            return callback({
                success: 0,
                error,
            });
        }

        if(user_dict[data.user.phoneNumber]) {
            let socketId = user_dict[data.phoneNumber].socketId;
            io.to(socketId).emit("/client/couple/request", data.user);
        }

        return callback({
            success: 1,
        });
    });
};