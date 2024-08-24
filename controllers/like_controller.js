const Like = require("../db/models/like");
const catchAsync = require("../utils/catch_async");
const AppError = require("../utils/app_error");

exports.createLike = catchAsync(async (req, res, next) => {
  const newLike = await Like.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      like: newLike,
    },
  });
});

exports.getAllLikes = catchAsync(async (req, res, next) => {
  const likes = await Like.findAll();

  res.status(200).json({
    status: "success",
    data: {
      likes,
    },
  });
});

exports.getLike = catchAsync(async (req, res, next) => {
  const like = await Like.findByPk(req.params.id);

  if (!like) {
    return next(new AppError("No like found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      like,
    },
  });
});

exports.deleteLike = catchAsync(async (req, res, next) => {
  const like = await Like.findByPk(req.params.id);

  if (!like) {
    return next(new AppError("No like found with that ID", 404));
  }

  await like.destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
