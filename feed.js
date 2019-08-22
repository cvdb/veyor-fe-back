const winston = require('./config/winston');
const Flickr = require('flickr-sdk');

// NOTE this API key is public info, no security issue here....
const FLICKR_VEYOR_API_KEY='86786fe2245ac375d3e148c41c8d2851';

const flickr = new Flickr(FLICKR_VEYOR_API_KEY);

function getFormattedFeed(tags, page) {
  return getFeed(tags, page)
    .then(function (flickr_res) {
      return mapToUrl(flickr_res.body);
    });
}

function getFeed(tags, page) {
  if (!tags) {
    return flickr.photos.getRecent({ 
      page: page || 1,
      media: 'photos',
      content_type: 1 // photos only
    });
  } else {
    return flickr.photos.search({
      tags: tags,
      media: 'photos',
      content_type: 1, // photos only
      page: page || 1
    });
  }
}

function mapToUrl(body) {
  body.photos.photo = body.photos.photo
    .map(p => {
      return `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_z.jpg`;  // NOTE: default to size: z 640, 640 on longest side
    }); 
  return body;
}

module.exports = { getFormattedFeed };

