const programRouter = require("express").Router();

const ProgramController = require("../controller/programController");
const uploadPhotos = require("../middlewares/uploadPhotos");
const { verifyAccessToken } = require("../middlewares/verifyTokens");
const checkAdmin = require("../middlewares/checkAdmin");
const validateId = require("../middlewares/validateId");

programRouter
  .get("/", ProgramController.getAllPrograms)
  .get("/:id", ProgramController.getOneProgram)
  .delete(
    "/:id",
    verifyAccessToken,
    validateId,
    checkAdmin,
    ProgramController.deleteProgram,
  )
  .put("/:id", verifyAccessToken, checkAdmin, uploadPhotos, ProgramController.updateProgram)
  .post("/", verifyAccessToken, checkAdmin, uploadPhotos, ProgramController.createProgram);

module.exports = programRouter;
