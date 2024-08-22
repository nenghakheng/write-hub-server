require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const app = express();

app.use(express.json());

const authRoute = require("./route/auth_route.js");
const catchAsync = require("./utils/catch_async.js");
const AppError = require("./utils/app_error.js");
const globalErrorHandler = require("./controller/error_controller.js");

// All routes here
app.use("/api/v1/auth", authRoute);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server.`, 404);
  })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});
