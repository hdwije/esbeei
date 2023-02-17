require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const rootRoute = require('./routes/root');
const { logger, logEvents } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const { corsOptions } = require('./configs/corsOptions');
const connectDb = require('./configs/dbConn');

const port = process.env.PORT || 3500;
const app = express();

connectDb();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/', rootRoute);
app.all('*', (req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, './views/404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 not found' });
  } else {
    res.type('txt').send('404 not found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.info('Connected to DB');
    console.info(
      `Server is running on port ${port} in ${process.env.NODE_ENV} environment`,
    );
  });
});

mongoose.connection.on('error', (err) => {
  console.log(err.message);

  const mongoMessage = `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`;

  logEvents(mongoMessage, 'mongoErrLog.log');
});
