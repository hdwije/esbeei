const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const rootRoute = require('./routes/root');
const { logger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const { corsOptions } = require('./configs/corsOptions');

const port = process.env.PORT || 3500;
const app = express();

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

app.listen(port, () => console.info(`Server is running on port ${port}`));
