"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      // Преподаватель принадлежит пользователю
      this.belongsTo(models.User, { foreignKey: "userId" });
      // Преподаватель принадлежит программе
      this.belongsTo(models.Program, { foreignKey: "programId" });
    }
  }

  Teacher.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      experience: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      programId: DataTypes.INTEGER,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  );

  return Teacher;
};
