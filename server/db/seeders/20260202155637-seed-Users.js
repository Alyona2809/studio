"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Иван",
        email: "ivan@example.com",
        password: await bcrypt.hash("qwertQWERT123!!!", 10),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Мария",
        email: "maria@example.com",
        password: await bcrypt.hash("qwertQWERT123!!!", 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Алексей",
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
