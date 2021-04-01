function errorMiddleware(err, req, res, next) {
  console.error(err);
  location.hash = '#error';

}

module.exports = errorMiddleware;
