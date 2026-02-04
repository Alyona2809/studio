"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VerificationCode extends Model {
    static associate() {}
  }

  VerificationCode.init(
    {
      email: DataTypes.STRING,
      code: DataTypes.STRING,
      purpose: DataTypes.STRING,
      expiresAt: DataTypes.DATE,
      used: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "VerificationCode",
      tableName: "VerificationCodes",
    }
  );

  return VerificationCode;
};
