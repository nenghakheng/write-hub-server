const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catch_async");
const AppError = require("../utils/app_error");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

const signUp = catchAsync(async (req, res, next) => {
  const body = req.body;

  if (!["1", "2"].includes(body.userType)) {
    throw new AppError("Invalid user type", 400);
  }

  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  if (!newUser) {
    throw next(new AppError("Failed to create new user", 400));
  }

  const result = newUser.toJSON();

  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({ id: result.id });

  if (!result) {
    return res.status(400).json({
      status: "fail",
      message: "Failed to create new user",
    });
  }

  return res.status(201).json({
    status: "success",
    message: "User created successfully",
    body: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw next(new AppError("Email and password are required", 400));
  }

  const result = await user.findOne({ where: { email } });
  console.log(result);

  console.log(result);
  if (!result || !(await bcrypt.compare(password, result.password))) {
    throw next(new AppError("Invalid email or password", 400));
  }

  const token = generateToken({ id: result.id });

  return res.status(200).json({
    status: "success",
    token,
  });
});

module.exports = { signUp, login };
