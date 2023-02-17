const { logEvents } = require('./logger');

const errorHandler = (err, req, res, next) => {
  const errMessage = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origins}`;
  const statusCode = res.statusCode ?? 500;

  logEvents(errMessage, 'errorLog.log');

  console.error(err);

  res.status(statusCode).json({ message: err.message });
  next();
};

module.exports = { errorHandler };
