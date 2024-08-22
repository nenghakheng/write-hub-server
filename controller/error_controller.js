const globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }
  sendErrorProd(err, res);
};

const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;
  const stack = err.stack;

  res.status(statusCode).json({
    status: status,
    message: message,
    stack: stack,
  });
};

const sendErrorProd = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;
  const stack = err.stack;

  if (err.isOperational) {
    res.status(statusCode).json({
      status: status,
      message: message,
    });
  }

  res.status(statusCode).json({
    status: "error",
    message: "Something went wrong",
  });
};

module.exports = globalErrorHandler;
