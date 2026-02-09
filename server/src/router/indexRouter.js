const indexRouter = require("express").Router();

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const teacherRouter = require("./teacherRouter");
const bookingRouter = require("./bookingRouter");
const studioRouter = require("./studioRouter");
const programRouter = require("./programRouter");
const ReviewRouter = require("./reviewRouter");
const priceRouter = require("./priceRouter");

indexRouter
  .use("/auth", authRouter)
  .use("/users", userRouter)
  .use("/teachers", teacherRouter)
  .use("/bookings", bookingRouter)
  .use("/studios", studioRouter)
  .use("/programs", programRouter)
  .use("/reviews", ReviewRouter)
  .use("/prices", priceRouter);

indexRouter.use((req, res) => {
  res.status(404).send("Страница не найдена");
});

module.exports = indexRouter;
