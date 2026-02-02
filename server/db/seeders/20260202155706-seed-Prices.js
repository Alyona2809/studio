"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Prices", [
      {
        age: "18-25 лет",
        numberClasses: "8 занятий",
        price: "5000 руб",
        programId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        age: "26-40 лет",
        numberClasses: "12 занятий",
        price: "7000 руб",
        programId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        age: "18+",
        numberClasses: "10 занятий",
        price: "6000 руб",
        programId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        age: "Все возраста",
        numberClasses: "Разовое посещение",
        price: "800 руб",
        programId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Prices", null, {});
  },
};
