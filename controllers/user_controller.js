const User = require("../db/models/user");
const Post = require("../db/models/post");
const Like = require("../db/models/like");
const Comment = require("../db/models/comment");
const catchAsync = require("../utils/catch_async");
const AppError = require("../utils/app_error");

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Post,
        attributes: ["id", "imageUrl", "caption", "createdAt"],
        as: "post",
        include: [
          {
            model: Like,
            attributes: ["id"],
            as: "like",
          },
          {
            model: Comment,
            attributes: ["id", "content"],
            as: "comment",
          },
        ],
      },
    ],
  });

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  const updatedUser = await user.update(req.body);

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  await user.destroy();

  res.status(204).json({
    status: "success",
    message: "Successfully deleted user",
  });
});
