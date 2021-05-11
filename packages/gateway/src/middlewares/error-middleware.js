function errorMiddleware(err, req, res, next) {
  if (req.headersSent) {
    return next(err);
  }

  res.status(500).send({
    data: null,
    error: "Something went wrong",
  });
}

module.exports = {
  errorMiddleware: errorMiddleware,
};
