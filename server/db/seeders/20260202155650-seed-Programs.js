"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Programs", [
      {
        programName: "Йога для начинающих",
        age: "18-25 лет",
        description: "Базовый курс йоги для тех, кто только начинает",
        photo: "yoga_basic.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        programName: "Пилатес продвинутый",
        age: "26-40 лет",
        description: "Интенсивный курс пилатеса для опытных",
        photo: "pilates_advanced.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        programName: "Стретчинг",
        age: "18+",
        description: "Растяжка для улучшения гибкости",
        photo: "stretching.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Programs", null, {});
  },
};
