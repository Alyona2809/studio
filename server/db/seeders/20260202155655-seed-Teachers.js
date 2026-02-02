"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Teachers", [
      {
        name: "Анна Сергеева",
        description: "Опытный преподаватель йоги с 10-летним стажем",
        experience: "10 лет",
        userId: 1,
        programId: 1,
        photo: "anna_teacher.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Дмитрий Волков",
        description: "Сертифицированный тренер по пилатесу",
        experience: "7 лет",
        userId: 2,
        programId: 2,
        photo: "dmitry_teacher.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Елена Морозова",
        description: "Специалист по стретчингу и реабилитации",
        experience: "5 лет",
        userId: 3,
        programId: 3,
        photo: "elena_teacher.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Teachers", null, {});
  },
};
