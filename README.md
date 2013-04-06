# What is it?
A tool for fetching LiveJournal RSS feeds including private posts

# Installation
```
npm install livejournal-feeds
```

# API
```javascript
var ljFeeds = require('livejournal-feeds');
var FeedsClient = new ljFeeds(YOUR_USERNAME, YOUR_PASSWORD);

// get original OPML with feeds
FeedsClient.collectOPML(function (err, xmlData) {
	if (err)
		throw new Error(err);

	// do smth with xmlData
});

// get your friend RSS
FeedsClient.fetch(LOVELY_FRIEND_USERNAME, function (err, xmlData) {
	if (err)
		throw new Error(err);

	// do smth with xmlData
});

// you can also pass community name as well as username. Enjoy!
```
