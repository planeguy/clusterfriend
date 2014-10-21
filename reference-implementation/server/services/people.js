﻿if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(["datastorage"]
    , function (datastorage) {
        return function People(user, person, listLength) {
            var me = this;
            var listLength = listLength || 10;

            this.get = function get() {
                return datastorage.person.read(person);
            };

            this.friendship = {
                exists: function (user, person) {
                    return Promise.all([
                                    datastorage.relationships.exists("friend", { start: { person: person }, end: { person: user } }),
                                    datastorage.relationships.exists("friend", { start: { person: user }, end: { person: person } })
                    ])
                    .then(function (f) {
                        return f[0] && f[1];
                    });
                }
            }

            this.posts = {
                list: function posts(nextafter) {
                    
                },
                get: function post(id) {
                    return me.posts.authorized(id)
                        .then(function (ok) {
                            if (!ok) throw new Error("unauthorized");
                            else return datastorage.post.read(id);
                        });
                },
                related: function related(id, type) {
                    return me.posts.authorized(id)
                    .then(function (ok) {
                        if (!ok) throw new Error("unauthorized");
                        else return datastorage.post.related(id, type);
                    });
                },
                add: function (post) {
                    return datastorage.post.create(user, post);
                },
                update: function (post) {

                },
                authorized: function(id) {
                    return ((user == person)?
                        datastorage.relationships.exists("poster", { start: { post: id }, end: { person: user } }) :
                        me.friendship.exists(user, person)
                            .then(function (exists) {
                                if (exists) return datastorage.relationships.exists("poster", { start: { post: id }, end: { person: person } });
                                else return false;
                            }));
                }
            };
        };
    });