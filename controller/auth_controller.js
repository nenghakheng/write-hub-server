const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

const signUp = async (req, res, next) => {
  const body = req.body;

  if (!["1", "2"].includes(body.userType)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid user type",
    });
  }

  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

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
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Email and password are required",
    });
  }

  const result = await user.findOne({ where: { email } });
  console.log(result);

  console.log(result);
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid email or password",
    });
  }

  const token = generateToken({ id: result.id });

  return res.status(200).json({
    status: "success",
    token,
  });
};

module.exports = { signUp, login };
