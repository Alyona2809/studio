const ReviewRouter = require("express").Router();

const ReviewController = require("../controller/reviewController");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

ReviewRouter.get("/", ReviewController.getAllReviews)
  .get("/:id", ReviewController.getOneReview)
  .post("/", verifyAccessToken, ReviewController.createReview)
  .delete("/:id", verifyAccessToken, ReviewController.deleteReview);

module.exports = ReviewRouter;
