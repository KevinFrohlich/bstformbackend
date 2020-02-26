'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "EmployeeNumber" from table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "ammend_fields",
    "created": "2020-02-26T18:19:51.116Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["users", "EmployeeNumber"]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
