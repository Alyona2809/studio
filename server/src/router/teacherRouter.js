const teacherRouter = require("express").Router();

const TeacherController = require("../controller/teacherController");
const uploadPhotos = require("../middlewares/uploadPhotos");
const { verifyAccessToken } = require("../middlewares/verifyTokens");
const checkAdmin = require("../middlewares/checkAdmin");
const validateId = require("../middlewares/validateId");

teacherRouter
  .get("/", TeacherController.getAll)
  .get("/:id", TeacherController.getOne)
  .delete(
    "/:id",
    verifyAccessToken,
    validateId,
    checkAdmin,
    TeacherController.delete,
  )
  .put("/:id", verifyAccessToken, checkAdmin, uploadPhotos, TeacherController.update)
  .post("/", verifyAccessToken, checkAdmin, uploadPhotos, TeacherController.create)
  .get("/program/:programId", TeacherController.getAllTeacherByProgram);

module.exports = teacherRouter;
