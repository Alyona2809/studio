const studioRouter = require("express").Router();

const StudioController = require("../controller/studioController");
const uploadPhotos = require("../middlewares/uploadPhotos");
const checkAdmin = require("../middlewares/checkAdmin");
const validateId = require("../middlewares/validateId");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

studioRouter
  .get("/", StudioController.getAll)
  .get("/:id", StudioController.getOne)
  .delete(
    "/:id",
    verifyAccessToken,
    validateId,
    checkAdmin,
    StudioController.delete,
  )
  .put("/:id", verifyAccessToken, checkAdmin, uploadPhotos, StudioController.update)
  .post("/", verifyAccessToken, checkAdmin, uploadPhotos, StudioController.create);

module.exports = studioRouter;
