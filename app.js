const express = require("express");
const path = require('path');
const app = express();
const morgan = require('morgan')
const winston = require('./config/winston');
const { getFormattedFeed } = require('./feed');

// server build output from react app
app.use(express.static(path.join(__dirname, 'build')));

app.use(morgan('combined', { stream: winston.stream }));

app.use(function (err, req, res, next) {
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(500).send('Something broke!')
});

// endpoint for loading the react app
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// NOTE: page is required, tags are optional
app.get("/feed/:page/:tags?", (req, res, next) => {
  winston.info('fetching feed for tags:' + req.params.tags + ' and page:' + req.params.page);
  getFormattedFeed(req.params.tags, req.params.page)
    .then(feed => res.json(feed))
    .catch(function (err) {
      winston.error('failed to fetch feed' + err.stack);
      next('failed to fetch flickr feed');
    });
});

app.listen(3001, () => {
  winston.info("Server running on port 3001");
});


