let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);
const knex = require(`${path}/db`);

module.exports = function(socket) {
    socket.on("/socket/schedule/register/*", async (data, callback) => {
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

        let sche_id = await knex.table('schedules').insert({
            coupleInfoId: data.coupleInfoId,
            color: data.color ? data.color : '',
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            memo: data.memo ? data.memo : '',
        });

        /* where in 이유 ==> sche_id 가 array 입니다. */
        let schedule = await knex.table("schedules").whereIn("scheduleId", sche_id).first();
        io.to(`/${data.coupleInfoId}`).emit("/client/schedule/watch/*", {
            type: 'register',
            schedule: schedule
        });

        return callback({
            success: 1,
            message: '성공적으로 저장하였습니다.',
            schedule,
        });
    });
};