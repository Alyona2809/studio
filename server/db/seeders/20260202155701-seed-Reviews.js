"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Reviews", [
      {
        content: "Отличный курс! Очень понравился преподаватель.",
        userId: 2,
        programId: 1,
        studioId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Хорошая программа, но помещение могло бы быть больше.",
        userId: 3,
        programId: 2,
        studioId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Прекрасные занятия, всем рекомендую!",
        userId: 1,
        programId: 3,
        studioId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
