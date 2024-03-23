let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);
const knex = require(`${path}/db`);

module.exports = function(socket) {
    socket.on("/socket/schedule/get_all", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        let error = new Object();
        if(data.coupleInfoId == 0) {
            io.to(socket.id).emit('/error', {
                success: 0,
                code: "COUPLE_EMPTY_ERROR",
                message: CRT_ERROR_CODE["COUPLE_EMPTY_ERROR"],
            });
            return;
        }

        let sche_list = await knex.table("schedules")
            .where("coupleInfoId", data.coupleInfoId)
            .orderBy('scheduleId', 'desc');

       
        return callback({
            success: 1,
            sche_list: sche_list,
        });
    });
};