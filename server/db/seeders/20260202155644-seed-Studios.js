"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Studios", [
      {
        address: "ул. Ленина, 10, Москва",
        photo: "studio1.jpg",
        x: 100,
        y: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: "пр. Победы, 25, Санкт-Петербург",
        photo: "studio2.jpg",
        x: 150,
        y: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: "ул. Центральная, 5, Казань",
        photo: "studio3.jpg",
        x: 200,
        y: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Studios", null, {});
  },
};
