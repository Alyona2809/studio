"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Users", [
      {
        firstName: "Иван",
        lastName: "Петров",
        userName: "ivan_petrov",
        email: "ivan@example.com",
        password: await bcrypt.hash("qwertQWERT123!!!", 10),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Мария",
        lastName: "Сидорова",
        userName: "maria_sid",
        email: "maria@example.com",
        password: await bcrypt.hash("qwertQWERT123!!!", 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Алексей",
        lastName: "Иванов",
        userName: "alex_ivanov",
        email: "alex@example.com",
        password: await bcrypt.hash("qwertQWERT123!!!", 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
