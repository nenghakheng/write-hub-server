"use strict";
const { Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
const Like = require("./like");
const Comment = require("./comment");

const Post = sequelize.define(
  "post",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    caption: {
      type: Sequelize.STRING,
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
    modelName: "post",
    paranoid: true,
  }
);

// // Define relationships
// Post.associate = (models) => {
//   Post.belongsTo(models.User, { foreignKey: "userId", as: "user" });
//   Post.hasMany(models.Comment, { foreignKey: "postId", as: "comment", onDelete: "CASCADE" });
//   Post.hasMany(models.Like, { foreignKey: "postId", as: "like", onDelete: "CASCADE" });
// };

Post.hasMany(Like, {
  foreignKey: "postId",
  as: "like",
  onDelete: "CASCADE",
});
Like.belongsTo(Post, { foreignKey: "postId", as: "post" });

Post.hasMany(Comment, { foreignKey: "userId", as: "comment" });
Comment.belongsTo(Post, { foreignKey: "userId" });

module.exports = Post;
