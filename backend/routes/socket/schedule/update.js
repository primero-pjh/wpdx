let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);
const knex = require(`${path}/db`);

module.exports = function(socket) {
    socket.on("/socket/schedule/update/*", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        let error = new Object();
        if(data.coupleInfoId == 0 || !data.hasOwnProperty('coupleInfoId')) {
            io.to(socket.id).emit('/error', {
                success: 0,
                code: "COUPLE_EMPTY_ERROR",
                message: CRT_ERROR_CODE["COUPLE_EMPTY_ERROR"],
            });
            return;
        }
        
        if(!data.title) {
            error["title"] = "필수입력 항목입니다.";
        }
        if(!data.startDate) {
            error["startDate"] = "필수입력 항목입니다.";
        }
        if(!data.endDate) {
            error["endDate"] = "필수입력 항목입니다.";
        }
        if(Object.keys(error).length > 0) {
            return callback({
                success: 0,
                error,
            });
        }
        if(data.scheduleId == 0) {
            return callback({
                success: 0,
                message: '일정이 선택되지 않았습니다. 다시 시도해주세요!'
            });
        }

        await knex.table('schedules').where("scheduleId", data.scheduleId).update({
            title: data.title,
            color: data.color ? data.color : '',
            startDate: data.startDate,
            endDate: data.endDate,
            memo: data.memo ? data.memo : '',
        });

        let schedule = await knex.table("schedules").where("scheduleId", data.scheduleId).first();
        io.to(`/${data.coupleInfoId}`).emit("/client/schedule/watch/*", {
            type: 'update',
            schedule: schedule
        });

        return callback({
            success: 1,
            message: '성공적으로 변경하였습니다.',
            schedule,
        });
    });
};