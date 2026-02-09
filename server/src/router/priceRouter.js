const priceRouter = require("express").Router();

const PriceController = require("../controller/priceController");
const { verifyAccessToken } = require("../middlewares/verifyTokens");
const checkAdmin = require("../middlewares/checkAdmin");

priceRouter
  .get("/", PriceController.getAllPrices)
  .get("/:id", PriceController.getOnePrice)
  .post("/", verifyAccessToken, checkAdmin, PriceController.createPrice)
  .delete("/:id", verifyAccessToken, checkAdmin, PriceController.deletePrice)
  .put("/:id", verifyAccessToken, checkAdmin, PriceController.updatePrice);

module.exports = priceRouter;
