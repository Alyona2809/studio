require("dotenv").config();
module.exports = {
  origin: [process.env.CLIENT_URL],
  optionsSuccessStatus: 200,
  credentials: true,
};
