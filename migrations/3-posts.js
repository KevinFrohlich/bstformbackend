'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "posts", deps: []
 *
 **/

var info = {
    "revision": 3,
    "name": "posts",
    "created": "2020-02-26T19:03:14.224Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "posts",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "PostId": {
                "type": Sequelize.INTEGER,
                "field": "PostId"
            },
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId"
            },
            "PostTitle": {
                "type": Sequelize.STRING,
                "field": "PostTitle"
            },
            "PostBody": {
                "type": Sequelize.STRING,
                "field": "PostBody"
            },
            "Image": {
                "type": Sequelize.BLOB,
                "field": "Image"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
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
