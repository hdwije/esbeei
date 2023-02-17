const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t ${uuid()}\t ${message}\n`;


  try {
    const logPath = path.join(__dirname, '../logs');

    if (!fs.existsSync(logPath)) {
      await fsPromises.mkdir(logPath);
    }

    await fsPromises.appendFile(path.join(logPath, logFileName), logItem);
  } catch (error) {
    console.error(error);
  }
};

const logger = (req, res, next) => {
  const message = `${req.method} ${req.path}`;

  logEvents(message, 'reqLog.log');
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logEvents, logger };
