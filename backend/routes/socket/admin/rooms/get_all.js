let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);

module.exports = function(socket) {
    socket.on("/socket/admin/rooms/get_all", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        let error = new Object();

        let map = io.sockets.adapter.rooms;
        let room_list = [];
        for (let key of map.keys()) {
            /* 첫 string이 '/' 이여야 한다. */
            // console.log("key:", key);
            // console.log(map.get(key));
            let list = Array.from(map.get(key));
            if(key[0] == '/') {
                room_list.push({
                    namespace: key,
                    list: list,
                });
            }
        }

        return callback({
            success: 1,
            room_list: room_list,
        });
    });
};