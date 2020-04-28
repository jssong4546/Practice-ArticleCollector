const express = require('express');
const bodyParser = require('body-parser');

const sourceRouter = require('./routes/source');
const dataRouter = require('./routes/data');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.text());

app.use('/api/source', sourceRouter);
app.use('/api/data', dataRouter);

app.listen(7000, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Listening on port 7000!');
  }
});

module.exports = app;
