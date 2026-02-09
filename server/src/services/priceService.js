const { Price } = require("../../db/models");

class PriceService {
  static async getAllPrices() {
    const prices = await Price.findAll();
    return prices;
  }

  static async getOnePrice(id) {
    const price = await Price.findByPk(id);
    return price;
  }
  static async createPrice({ numberClasses, price, programId }) {
    const newPrice = await Price.create({ numberClasses, price, programId });
    return newPrice;
  }
  static async deletePrice(id) {
    const price = await Price.findByPk(id);
    price.destroy();
    return id;
  }
  static async updatePrice(id, data) {
    const price = await Price.update(data, { where: { id } });
    return price;
  }
}
module.exports = PriceService;
