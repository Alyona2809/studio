"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // У пользователя может быть много отзывов
      this.hasMany(models.Review, { foreignKey: "userId" });
      // У пользователя может быть много преподавателей (если это связь)
      this.hasMany(models.Teacher, { foreignKey: "userId" });
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      userName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
