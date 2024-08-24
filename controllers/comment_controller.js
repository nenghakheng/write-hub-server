const Comment = require("../db/models/comment");
const catchAsync = require("../utils/catch_async");
const AppError = require("../utils/app_error");

exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      comment: newComment,
    },
  });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.findAll();

  res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
});

exports.getComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByPk(req.params.id);

  if (!comment) {
    return next(new AppError("No comment found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByPk(req.params.id);

  if (!comment) {
    return next(new AppError("No comment found with that ID", 404));
  }

  const updatedComment = await comment.update(req.body);

  res.status(200).json({
    status: "success",
    data: {
      comment: updatedComment,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByPk(req.params.id);

  if (!comment) {
    return next(new AppError("No comment found with that ID", 404));
  }

  await comment.destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
