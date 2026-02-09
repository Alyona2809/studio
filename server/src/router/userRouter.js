const userRouter = require("express").Router();

const UserController = require("../controller/userController");
const validateId = require("../middlewares/validateId");
const checkAdmin = require("../middlewares/checkAdmin");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

userRouter
  .get("/", verifyAccessToken, checkAdmin, UserController.getAll)
  .get("/:id", verifyAccessToken, UserController.getOne)
  .delete(
    "/:id",
    verifyAccessToken,
    validateId,
    checkAdmin,
    UserController.delete,
  )
  .put("/:id", verifyAccessToken, UserController.update);

module.exports = userRouter;
