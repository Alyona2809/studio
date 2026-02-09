const PriceService = require("../services/priceService");
const formatResponse = require("../utils/formatResponse");

class PriceController {
  static async getAllPrices(req, res) {
    try {
      const prices = await PriceService.getAllPrices();
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Все цены",
          data: prices,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить все цены",
          error: error.message,
        }),
      );
    }
  }
  static async getOnePrice(req, res) {
    try {
      const { id } = req.params;
      const price = await PriceService.getOnePrice(id);
      res
        .status(200)
        .json(
          formatResponse({ statusCode: 200, message: "Цена", data: price }),
        );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить цену",
          error: error.message,
        }),
      );
    }
  }

  static async createPrice(req, res) {
    try {
      const { numberClasses, price, programId } = req.body;
      const newPrice = await PriceService.createPrice({
        numberClasses,
        price,
        programId,
      });
      res.status(201).json(
        formatResponse({
          statusCode: 201,
          message: "Цена успешно создана",
          data: newPrice,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось создать цену",
          error: error.message,
        }),
      );
    }
  }
  static async deletePrice(req, res) {
    try {
      const { id } = req.params;
      const price = await PriceService.deletePrice(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Цена успешно удалена",
          data: price,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось удалить цену",
          error: error.message,
        }),
      );
    }
  }

  static async updatePrice(req, res) {
    try {
      const { id } = req.params;
      const { numberClasses, price, programId } = req.body;
      const updatedPrice = await PriceService.updatePrice(id, {
        numberClasses,
        price,
        programId,
      });
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Цена успешно обновлена",
          data: updatedPrice,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось обновить цену",
          error: error.message,
        }),
      );
    }
  }
}
module.exports = PriceController;
