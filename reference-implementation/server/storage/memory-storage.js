if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
define([]
	, function () {
		return new (function MemoryStorage() {
			var me = this;
			var people = {};
			var posts = {};
			var relationships = [];

			this.person = {
				create: function (user, details) {
					if (!people[user]) {
						people[user] = details;
						return details;
					} else throw new Error("already exists");
				},
				read: function (user) {
					if (people[user]) return people[user];
					else throw new Error("not found");
				},
				update: function (user, details) {
					if (people[user]) {
						people[user] = details;
						return details;
					} else throw new Error("already exists");
				},
				"delete": function () {
					if (people[user]) {
						delete people[user];
						return null;
					}
					throw new Error("not found");
				}
			};

			this.post = {
				create: function (user, post) {
					if (!people[user]) throw new Error("unauthorized");
					if (!posts[user]) posts[user] = [];
					var newid = posts[user].length;
					posts[user] = post;
					return post;
				},
				read: function (user, postid) {
					if (!people[user]) throw new Error("unauthorized");
					if (posts[user] && posts[user].length > postid && posts[user][postid]) return posts[user][postid];
					else throw new Error("not found");
				},
				update: function (user, postid, post) {
					if (!people[user]) throw new Error("unauthorized");
					if (posts[user] && posts[user].length > postid) {
						people[user] = post;
					} else throw new Error("already exists");
				},
				"delete": function () {
					if (!people[user]) throw new Error("unauthorized");
					if (posts[user] && posts[user].length > postid) posts[user][postid] = null;
					throw new Error("not found");
				}
			};

			this.relationships = {
			    create: function (relationship) {

					if (!people[user]) {
						people[user] = details;
						return details;
					} else throw new Error("already exists");
				},
				read: function (user) {
					if (people[user]) return people[user];
					else throw new Error("not found");
				},
				update: function (user, details) {
					if (people[user]) {
						people[user] = details;
						return details;
					} else throw new Error("already exists");
				},
				"delete": function () {
					if (people[user]) {
						delete people[user];
						return null;
					}
					throw new Error("not found");
				}
			};
		})();
	})