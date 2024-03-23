let appRoot = require("app-root-path");
let path = appRoot.path;
let CRT_ERROR_CODE = require(`${path}/error_code`);
const knex = require(`${path}/db`);

module.exports = function(socket) {
    socket.on("/socket/community/get_all", async (data, callback) => {
        let user_dict = require(`${path}/app`)["user_dict"];
        let io = require(`${path}/bin/www`)["io"];
        let error = new Object();

        let cmu_list = await knex.table("communities");
       
        return callback({
            success: 1,
            cmu_list: cmu_list,
        });
    });
};