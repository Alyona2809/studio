const express = require("express");
const serverConfig = require("./configs/serverConfig");
const indexRouter = require("./router/indexRouter");

require("dotenv").config();

const app = express();
serverConfig(app);

const PORT = process.env.PORT || 3001;

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
