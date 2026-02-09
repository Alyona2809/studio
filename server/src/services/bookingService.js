const { Booking } = require("../../db/models");
const EmailService = require("./emailService");

class BookingService {
  static async createBooking({ name, phone, email }) {
    const booking = await Booking.create({ name, phone, email });
    await EmailService.sendBookingNotification({ name, phone, email });
    return booking;
  }
}

module.exports = BookingService;
