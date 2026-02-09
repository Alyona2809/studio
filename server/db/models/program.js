"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    static associate(models) {
      // У программы может быть много отзывов
      this.hasMany(models.Review, { foreignKey: "programId" });
      // У программы может быть много преподавателей
      this.hasMany(models.Teacher, { foreignKey: "programId" });
      // У программы может быть много цен
      this.hasMany(models.Price, { foreignKey: "programId" });
    }
  }

  Program.init(
    {
      programName: DataTypes.STRING,
      age: DataTypes.STRING,
      description: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Program",
    },
  );

  return Program;
};
