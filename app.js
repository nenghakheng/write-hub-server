require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const app = express();

app.use(express.json());

const authRoute = require("./route/auth_route.js");

// All routes here
app.use("/api/v1/auth", authRoute);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});
