let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);
const knex = require(`${path}/db`);

module.exports = function(socket) {
    socket.on("/socket/schedule/delete/*", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        if(data.coupleInfoId == 0 || !data.hasOwnProperty('coupleInfoId')) {
            io.to(socket.id).emit('/error', {
                success: 0,
                code: "COUPLE_EMPTY_ERROR",
                message: CRT_ERROR_CODE["COUPLE_EMPTY_ERROR"],
            });
            return;
        }
        
        if(!data.scheduleId) {
            return callback({
                success: 0,
                message: '일정이 선택되지 않았습니다.\n 다시 시도해주세요!'
            });
        }

        let schedule = await knex.table('schedules').where("scheduleId", data.scheduleId).first();
        if(!schedule) {
            return callback({
                success: 0,
                message: '이미 삭제된 일정이거나 존재하지 않습니다. 다시 시도해주세요!'
            });
        }

        await knex.table("schedules").where("scheduleId", data.scheduleId).del();

        io.to(`/${data.coupleInfoId}`).emit("/client/schedule/watch/*", {
            type: 'delete',
            scheduleId: schedule.scheduleId
        });

        return callback({
            success: 1,
            message: '성공적으로 삭제하였습니다.',
            scheduleId: schedule.scheduleId
        });
    });
};