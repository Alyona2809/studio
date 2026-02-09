const { Review } = require("../../db/models");

class ReviewService {
  static async getAllReviews() {
    const reviews = await Review.findAll();
    return reviews;
  }
  static async getOneReview(id) {
    const review = await Review.findByPk(id);
    return review;
  }
  static async createReview(review) {
    const newReview = await Review.create(review);
    return newReview;
  }
  static async deleteReview(id) {
    const review = await Review.findByPk(id);
    review.destroy();
    return id;
  }
  static async updateReview(id, data) {
    const review = await Review.update(data, { where: { id } });
    return review;
  }
  static async getAllReviewsByProgram(programId) {
    const reviews = await Review.findAll({ where: { programId } });
    return reviews;
  }
  static async getAllReviewsByStudio(studioId) {
    const reviews = await Review.findAll({ where: { studioId } });
    return reviews;
  }
}

module.exports = ReviewService;
