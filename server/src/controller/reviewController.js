const ReviewService = require("../services/reviewService");
const formatResponse = require("../utils/formatResponse");

class ReviewController {
  static async getAllReviews(req, res) {
    try {
      const reviews = await ReviewService.getAllReviews();
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Все отзывы",
          data: reviews,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить все отзывы",
          error: error.message,
        }),
      );
    }
  }

  static async getOneReview(req, res) {
    try {
      const { id } = req.params;
      const review = await ReviewService.getOneReview(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Один отзыв",
          data: review,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось пол учить один отзыв",
          error: error.message,
        }),
      );
    }
  }
  static async createReview(req, res) {
    try {
      const { content, userId, programId, studioId } = req.body;
      const review = await ReviewService.createReview({
        content,
        userId,
        programId,
        studioId,
      });
      res.status(201).json(
        formatResponse({
          statusCode: 201,
          message: "Отзыв успешно создан",
          data: review,
        }),
      );

      if (userId === null) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Необходимо авторизоваться",
          }),
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось создать отзыв",
          error: error.message,
        }),
      );
    }
  }
  static async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const review = await ReviewService.deleteReview(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Отзыв успешно удален",
          data: review,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось удалить отзыв",
          error: error.message,
        }),
      );
    }
  }
}
module.exports = ReviewController;
