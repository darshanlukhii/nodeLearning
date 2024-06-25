// const express = require("express");
// const morgan = require("morgan");

// const tourRouter = require("./routes/tourRoutes");
// const userRouter = require("./routes/userRoutes");

// const app = express();
// app.use(express.json());

// app.use(morgan("dev"));

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// app.get("/api/v1/tours/", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours/", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

// const tourRouter = express.Router();
// const userRouter = express.Router();

// tourRouter.route("/").get(getAllTours).post(createTour);
// tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

// userRouter.route("/").get(getAllUsers).post(createUser);
// userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// Routes
// app.use("/api/v1/tours", tourRouter);
// app.use("/api/v1/users/", userRouter);

// //Start Server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`App running on the ${port}...`);
// });

const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// Middleware
const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users/", userRouter);

//Start Server
module.exports = app;
