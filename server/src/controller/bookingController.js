const BookingService = require("../services/bookingService");
const formatResponse = require("../utils/formatResponse");

class BookingController {
  static async create(req, res) {
    try {
      const { name, phone, email } = req.body;
      const result = await BookingService.createBooking({ name, phone, email });
      res.status(201).json(
        formatResponse({
          statusCode: 201,
          message: "Заявка успешно отправлена",
          data: result,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось отправить заявку",
          error: error.message,
        }),
      );
    }
  }
}

module.exports = BookingController;
