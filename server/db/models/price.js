"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    static associate(models) {
      // Цена принадлежит программе
      this.belongsTo(models.Program, { foreignKey: "programId" });
    }
  }

  Price.init(
    {
      numberClasses: DataTypes.STRING,
      price: DataTypes.STRING,
      programId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Price",
    },
  );

  return Price;
};
