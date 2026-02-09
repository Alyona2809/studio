const { Studio } = require("../../db/models");

class StudioService {
  static async getAllStudios() {
    const studios = await Studio.findAll();
    return studios;
  }

  static async getOneStudio(id) {
    const studio = await Studio.findByPk(id);
    return studio;
  }

  static async createStudio({ address, photo, x, y }) {
    const studio = await Studio.create({ address, photo, x, y });
    return studio;
  }

  static async deleteStudio(id) {
    const studio = await Studio.findByPk(id);
    studio.destroy();
    return id;
  }

  static async updateStudio(id, data) {
    const studio = await Studio.update(data, { where: { id } });
    if (studio) {
      return studio;
    }
    return false;
  }
}

module.exports = StudioService;
