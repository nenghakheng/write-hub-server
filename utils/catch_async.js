const catchAsync = (fn) => {
  const errorHandler = (req, res, next) => {
    return fn(req, res, next).catch(next);
  };

  return errorHandler;
};

module.exports = catchAsync;
