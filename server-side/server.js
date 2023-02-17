const express = require('express');
const path = require('path');

const rootRoute = require('./routes/root');

const app = express();
const port = process.env.PORT || 3500;

app.use(express.json());
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

app.listen(port, () => console.info(`Server is running on port ${port}`));
