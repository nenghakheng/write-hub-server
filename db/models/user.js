"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require("bcrypt");
const AppError = require("../../utils/app_error");
const Post = require("./post");
const Like = require("./like");
const Comment = require("./comment");

const User = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userType: {
      type: Sequelize.ENUM("0", "1", "2"),
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    confirmPassword: {
      type: Sequelize.VIRTUAL,
      set(value) {
        if (value === this.password) {
          const hashedPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hashedPassword); // Before the data is saved to the database, the password is hashed.
        } else {
          throw new Error("Password confirmation does not match password");
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    modelName: "user",
    paranoid: true,
  }
);

// // Define relationships
// User.associate = (models) => {
//   User.hasMany(models.Post, { foreignKey: "userId", as: "post" });
//   User.hasMany(models.Comment, { foreignKey: "userId", as: "comment" });
//   User.hasMany(models.Like, { foreignKey: "userId", as: "like" });
// };
User.hasMany(Post, { foreignKey: "userId", as: "post" });
Post.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Like, { foreignKey: "userId", as: "like" });
Like.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId", as: "comment" });
Comment.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
