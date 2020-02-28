"use strict";
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define(
    "posts",
    {
      PostId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      UserId: DataTypes.INTEGER,
      PostTitle: DataTypes.STRING,
      PostBody: DataTypes.STRING,
      Deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Image: DataTypes.BLOB
    },
    {}
  );
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};
