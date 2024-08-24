const Post = require("../db/models/post");
const catchAsync = require("../utils/catch_async");
const AppError = require("../utils/app_error");
const User = require("../db/models/user");
const Like = require("../db/models/like");
const Comment = require("../db/models/comment");

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "userType", "email", "firstName", "lastName"],
        as: "user",
      },
      {
        model: Like,
        attributes: ["id", "userId", "postId"],
        as: "like",
      },
      {
        model: Comment,
        attributes: ["id", "content"],
        as: "comment",
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  const updatedPost = await post.update(req.body);

  res.status(200).json({
    status: "success",
    data: {
      post: updatedPost,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  await post.destroy();

  res.status(204).json({
    status: "success",
    message: "Successfully delete post",
  });
});
