"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PendingRegistration extends Model {
    static associate() {}
  }

  PendingRegistration.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      expiresAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PendingRegistration",
      tableName: "PendingRegistrations",
    }
  );

  return PendingRegistration;
};
