"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

const Comment = sequelize.define(
  "comment",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    modelName: "comment",
    paranoid: true,
  }
);

// Define relationships
// Comment.associate = (models) => {
//   Comment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
//   Comment.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
// };

module.exports = Comment;
