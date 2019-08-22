# veyor-fe-back
veyor front end coding challenge - back-end REST API

```
Challenge - Flickr feed viewer and search
Write a simple web application that reads data from Flickr's public feeds and displays the
images on the page to the user.
```

## Why a REST API for a front end project
First look at the problem it is clear that the simplest solution would be to call the public FEEDS endpoint directly from the react code:

    https://www.flickr.com/services/feeds/photos_public.gne?format=json&tag=dog

The problem with this is that it only returns 20 results. There are node modules like 'feedparser', 'feed-reader' and 'rss-parser' etc that can be used to listen to the feeds and then stream new results for processing but then what should be done with these new feed items?

## Feed vs request based API
Should the back-end service STORE feed items in a DB, use a web socket to stream the new feed items to the react app? The question also states:

```
On page load the applications should load the public feed images in either a list or grid
view.

The user should be able to enter a keyword in a search box and click on a search button
and the app should return images with the relevant tags.
```

These requirements seem better suted to a REQUEST based API rather than a feed reader.




