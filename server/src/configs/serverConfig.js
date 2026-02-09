const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const removeHeader = require("../middlewares/removeHeader");
const corsConfig = require("./corsConfig");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const imagesDir = path.join(__dirname, "../../public/images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const serverConfig = (app) => {
  app.use(cors(corsConfig));
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/api/images", express.static(imagesDir));
  app.use(removeHeader);
  app.use(cookieParser());
};

module.exports = serverConfig;
