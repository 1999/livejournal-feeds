var request = require('request');

var FeedsClient = function (user, password) {
	this._user = user;
	this._password = password;
};

FeedsClient.prototype = {
	/**
	 * Get RSS feed for user/community with private posts
	 *
	 * @param {String} user LiveJournal username or community name
	 * @param {Function} callback which invokes:
	 *		{String|Null} err
	 *		{String} XML response
	 */
	fetch: function (user, callback) {
		request({
			url: 'http://' + user + '.livejournal.com/data/rss',
			qs: {auth: 'digest'},
			auth: {
				user: this._user,
				pass: this._password,
				sendImmediately: false
			}
		}, function (err, res, body) {
			if (err)
				return callback(err);

			if (res.statusCode === 401)
				return callback("Digest authentication failed");

			callback(null, body);
		});
	},

	/**
	 * Collect an OPML-file with your RSS feeds on LiveJournal
	 * WARNING: RSS will produce only public posts
	 *
	 * @param {Function} callback which invokes:
	 *		{String|Null} err
	 *		{String} XML response
	 */
	collectOPML: function (callback) {
		request({
			url: 'http://www.livejournal.com/tools/opml.bml',
			qs: {user: this._user}
		}, function (err, res, body) {
			if (err)
				return callback(err);

			callback(null, body);
		});
	}
};

module.exports = FeedsClient;
