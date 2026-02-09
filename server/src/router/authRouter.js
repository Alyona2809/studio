const authRouter = require("express").Router();

const AuthController = require("../controller/authController");
const { verifyRefreshToken } = require("../middlewares/verifyTokens");

authRouter
  .post("/register-request", AuthController.registerRequest)
  .post("/register-verify", AuthController.registerVerify)
  .post("/forgot-password", AuthController.forgotPassword)
  .post("/reset-password", AuthController.resetPassword)
  .post("/login", AuthController.login)
  .get("/logout", AuthController.logout)
  .get("/refresh", verifyRefreshToken, AuthController.refreshTokens);

module.exports = authRouter;
