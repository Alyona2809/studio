const express = require("express");
const serverConfig = require("./configs/serverConfig");
const path = require("path");

require("dotenv").config();

const app = express();
serverConfig(app);

const indexRouter = require(path.join(__dirname, "../routes/index.routes"));
app.use("/api", indexRouter);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server on ${PORT}`));
}

module.exports = app;
