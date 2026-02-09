const bookingRouter = require("express").Router();

const BookingController = require("../controller/bookingController");
const checkBookingBody = require("../middlewares/checkBookingBody");

bookingRouter.post("/", checkBookingBody, BookingController.create);

module.exports = bookingRouter;
