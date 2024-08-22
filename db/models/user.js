"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require("bcrypt");
const AppError = require("../../utils/app_error");

module.exports = sequelize.define(
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
          throw new AppError(
            "Password confirmation does not match password",
            400
          );
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
