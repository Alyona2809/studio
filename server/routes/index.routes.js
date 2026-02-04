const express = require("express");
const AuthController = require("../src/controller/authController");
const UserController = require("../src/controller/userController");
const TeacherController = require("../src/controller/teacherController");
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../src/middlewares/verifyTokens");
const checkAdmin = require("../src/middlewares/checkAdmin");

const router = express.Router();

// Auth
router.post("/auth/register-request", AuthController.registerRequest);
router.post("/auth/register-verify", AuthController.registerVerify);
router.post("/auth/forgot-password", AuthController.forgotPassword);
router.post("/auth/reset-password", AuthController.resetPassword);
router.post("/auth/login", AuthController.login);
router.post("/auth/logout", AuthController.logout);
router.get("/auth/refresh", verifyRefreshToken, AuthController.refreshTokens);

// Users (пример - добавьте свои маршруты)
router.get("/users", verifyAccessToken, checkAdmin, UserController.getAll);
router.get("/users/:id", verifyAccessToken, UserController.getOne);
router.put("/users/:id", verifyAccessToken, UserController.update);
router.delete(
  "/users/:id",
  verifyAccessToken,
  checkAdmin,
  UserController.delete
);

// Teachers (пример)
router.get("/teachers", TeacherController.getAll);
router.get("/teachers/:id", TeacherController.getOne);

module.exports = router;
