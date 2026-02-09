const { Program } = require("../../db/models");

class ProgramService {
  static async getAllPrograms() {
    const programs = await Program.findAll();
    return programs;
  }
  static async getOneProgram(id) {
    const program = await Program.findByPk(id);
    return program;
  }
  static async createProgram({ age, programName, description, photo }) {
    const newProgram = await Program.create({
      age,
      programName,
      description,
      photo,
    });
    return newProgram;
  }
  static async deleteProgram(id) {
    const program = await Program.findByPk(id);
    program.destroy();
    return id;
  }
  static async updateProgram(id, data) {
    const updatedProgram = await Program.update(data, { where: { id } });
    if (updatedProgram) {
      return updatedProgram;
    }
    return false;
  }
}
module.exports = ProgramService;
