"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Отзыв принадлежит пользователю
      this.belongsTo(models.User, { foreignKey: "userId" });
      // Отзыв принадлежит программе
      this.belongsTo(models.Program, { foreignKey: "programId" });
      // Отзыв принадлежит студии
      this.belongsTo(models.Studio, { foreignKey: "studioId" });
    }
  }

  Review.init(
    {
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      programId: DataTypes.INTEGER,
      studioId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );

  return Review;
};
