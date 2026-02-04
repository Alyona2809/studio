const { Teacher } = require("../../db/models");

class TeacherService {
  static async getAllTeachers() {
    const teachers = await Teacher.findAll();
    return teachers;
  }

  static async getOneTeacher(id) {
    const teacher = await Teacher.findByPk(id);
    return teacher;
  }

  static async createTeacher({
    name,
    description,
    experience,
    userId,
    programId,
    photo,
  }) {
    const teacher = await Teacher.create({
      name,
      description,
      experience,
      userId,
      programId,
      photo,
    });
    return teacher;
  }

  static async deleteTeacher(id) {
    const teacher = await Teacher.findByPk(id);
    teacher.destroy();
    return id;
  }

  static async updateTeacher(id, data) {
    const teacher = await Teacher.update(data, { where: { id } });
    if (teacher) {
      return teacher;
    }
    return false;
  }

  static async getAllTeacherByProgram(programId) {
    const teachers = await Teacher.findAll({
      where: { programId },
    });
    return teachers;
  }
}

module.exports = TeacherService;
