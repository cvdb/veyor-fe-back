const winston = require('../config/winston');
const feed = require('../feed');

test('get no params', done => {
  feed.getFormattedFeed()
    .then(results => {
      // winston.info('FEED RESULTS:' + JSON.stringify(results));
      expect(results.photos.page).toBe(1);
    })
    .then(() => done());
});

test('get with page', done => {
  feed.getFormattedFeed(null, 2000)
    .then(results => {
      // winston.info('FEED RESULTS:' + JSON.stringify(results));
      expect(results.photos.page).toBe(2000);
    })
    .then(() => done());
});

test('get with tag and page', done => {
  feed.getFormattedFeed('fire, eater', 3)
    .then(results => {
      winston.info('FEED RESULTS:' + JSON.stringify(results));
      expect(results.photos.page).toBe(3);
    })
    .then(() => done());
});

