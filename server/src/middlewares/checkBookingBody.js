function checkBookingBody(req, res, next) {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    return res.status(400).json({
      statusCode: 400,
      message: "Необходимо заполнить: имя, номер телефона и почту",
    });
  }
  next();
}

module.exports = checkBookingBody;
