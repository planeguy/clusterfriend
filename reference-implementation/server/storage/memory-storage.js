if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(["lodash", "model/person", "model/post"]
    , function (_, Person, Post) {

        var addTestData = true;

        return new (function MemoryStorage(test) {
            var me = this;
            var storage = {
                people: {},
                posts: [],
                relationships: {
                    going: [],
                    notgoing: [],
                    reply: [],
                    link: [],
                    poster: [],
                    tagged: [],
                    friend: [],
                    enemy: []
                }
            };

            this.person = {
                create: function (user, details) {
                    return new Promise(function (resolve, reject) {
                        if (!storage.people[user]) {
                            storage.people[user] = new Person(user, details);
                            resolve(storage.people[user]);
                        } else {
                            throw new Error("already exists! update instead");
                        };
                    });
                },
                read: function (user) {
                    return new Promise(function (resolve, reject) {
                        resolve(storage.people[user]);
                    });
                },
                update: function (user, details) {
                    return new Promise(function (resolve, reject) {
                        if (storage.people[user]) {
                            storage.people[user].setDetails(details);
                            resolve(details);
                        } else {
                            throw new Error("does not exist! create instead");
                        };
                    });
                },
                "delete": function (user) {
                    return new Promise(function (resolve, reject) {
                        if (storage.people[user]) delete storage.people[user];
                        resolve(true);
                    });
                }
            };

            this.post = {
                create: function (user, post) {
                    return new Promise(function (resolve, reject) {
                        var newId = storage.posts.length;
                        var p = new Post(newId, new Date(), post);
                        storage.posts.push(p);
                        storage.relationships.poster.push({
                            start: { post: newId },
                            end: { person: user }
                        });
                        resolve(storage.posts[newId]);
                    });
                },
                read: function (postid) {
                    return new Promise(function (resolve, reject) {
                        resolve(storage.posts[postid]);
                    });
                },
                related: function (id, type, limit) {
                    return me.relationships.query(type, { end: { post: id } })
                    .then(function (results) {
                        var allresults = results
                            .map(function (r) {
                                if (r.start.person) {
                                    return storage.people[r.start.person];
                                }
                                if (r.start.post) {
                                    return storage.posts[r.start.post];
                                }
                            });
                        if (!limit || (!limit.nextafter && !limit.length)) {
                            return allresults;
                        } else {
                            if (!limit.nextafter && limit.length) return _.first(allresults, length);
                            else {
                            }
                        }
                    });
                }
            }

            this.relationships = {
                exists: function (type, relation) {
                    return new Promise(function (resolve, reject) {
                        if (storage.relationships[type]) {
                            resolve(
                                _.some(storage.relationships[type], function (r) {
                                    return _.isEqual(r, relation);
                                })
                            );
                        }
                    });
                },
                query: function (type, relation) {
                    function queryAType(type, relation) {
                        return new Promise(function (resolve, reject) {
                            if (storage.relationships[type]) {
                                if (!relation) {
                                    resolve(storage.relationships[type]);
                                    return;
                                } else {
                                    resolve(storage.relationships[type].filter(function (r) {
                                        return (!relation.start || _.isEqual(relation.start, r.start)) && (!relation.end || _.isEqual(relation.end, r.end) && (!relation.private || relation.private == r.private));
                                    }));
                                    return;
                                }
                            } else resolve([]);
                        });
                    }
                    if (type) return queryAType(type, relation);
                    else return (function (relation) {
                        var ks = Object.keys(storage.relationships);
                        return Promise.all(ks.map(function (k) {
                            return queryAType([ks[k]], relation);
                        }));
                    })(relation);
                },
                create: function (type, relation) {
                    return me.relationships.exists(type, relation)
                    .then(function (exists) {
                        if (exists) throw new Error("already exists!");
                        return new Promise(function (resolve, reject) {
                            storage.relationships[type].push(relation);
                            resolve(relation);
                        });
                    });
                }
            };

            function initWithTestData() {
                storage = {
                    people: {
                        planeguy: new Person("planeguy", { "user": "planeguy", "email": "delek@delek.org", "first": "Delek", "last": "Turner", "imageUrl": "http://shareatopia.com/wp-content/uploads/2013/08/mm-pinata-cake.jpg" }),
                        chanceula: new Person("chanceula", { "user": "chanceula", "email": "chancedixon@delek.org", "first": "Chance", "imageUrl": "http://shareatopia.com/wp-content/uploads/2013/08/mm-pinata-cake.jpg" }),
                        pixelante: new Person("pixelante", { "user": "pixelante", "email": "pixelante@delek.org", "first": "Audrey", "imageUrl": "http://shareatopia.com/wp-content/uploads/2013/08/mm-pinata-cake.jpg" }),
                    },
                    posts: [
                        {id:0, date: new Date(), "markdown": "test1 delek" },
                        { id: 1, date: new Date(), "markdown": "test2 chance" },
                        { id: 2, date: new Date(), "markdown": "test3 pixelante" }
                    ],
                    relationships: {
                        going: [],
                        notgoing: [],
                        reply: [
                            {start:{post:2}, end:{post:0}, "private":true}
                        ],
                        link: [],
                        poster: [
                            { start: { post: 0 }, end: { person: "planeguy" } },
                            { start: { post: 1 }, end: { person: "chanceula" } },
                            { start: { post: 2 }, end: { person: "pixelante" } }
                        ],
                        tagged: [],
                        friend: [
                            { start: { person: "planeguy" }, end: { person: "chanceula" } },
                            { start: { person: "chanceula" }, end: { person: "planeguy" } },
                            { start: { person: "pixelante" }, end: { person: "planeguy" } }
                        ],
                        enemy: []
                    },
                    registrations: {}
                };
            }

            if (test) initWithTestData();

        })(addTestData);
    });