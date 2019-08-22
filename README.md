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

The problem with this is that it only returns 20 results. You could implements and actual FEED where
