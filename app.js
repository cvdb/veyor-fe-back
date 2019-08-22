const express = require("express");
const app = express();
const morgan = require('morgan')
const winston = require('./config/winston');
const { getFormattedFeed } = require('./feed');

app.use(morgan('combined', { stream: winston.stream }));

app.use(function (err, req, res, next) {
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(500).send('Something broke!')
});

app.get("/feed/:tags?/:page?", (req, res, next) => {
  winston.info('fetching feed for tags:' + req.params.tags + ' and page:' + req.params.page);
  getFormattedFeed(req.params.tags, req.params.page)
    .then(feed => res.json(feed))
    .catch(function (err) {
      winston.error('failed to fetch feed' + err.stack);
      next('failed to fetch flickr feed');
    });
});

app.listen(3000, () => {
  winston.info("Server running on port 3000");
});


