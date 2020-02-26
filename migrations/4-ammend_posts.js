'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "id" from table "posts"
 * addColumn "Deleted" to table "posts"
 * changeColumn "PostId" on table "posts"
 * changeColumn "PostId" on table "posts"
 * changeColumn "PostId" on table "posts"
 *
 **/

var info = {
    "revision": 4,
    "name": "ammend_posts",
    "created": "2020-02-26T19:07:12.138Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["posts", "id"]
    },
    {
        fn: "addColumn",
        params: [
            "posts",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            }
        ]
    }
];

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
