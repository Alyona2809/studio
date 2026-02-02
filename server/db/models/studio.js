"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    static associate(models) {
      // У студии может быть много отзывов
      this.hasMany(models.Review, { foreignKey: "studioId" });
    }
  }

  Studio.init(
    {
      address: DataTypes.STRING,
      photo: DataTypes.STRING,
      x: DataTypes.INTEGER,
      y: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Studio",
    }
  );

  return Studio;
};
