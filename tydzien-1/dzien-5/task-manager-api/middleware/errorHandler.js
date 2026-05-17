const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal server error",
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

module.exports = errorHandler;