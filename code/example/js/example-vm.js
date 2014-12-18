define(["jquery", "knockout", "openpgp", "friends/generate"],
    function ($, ko, openpgp, generateFriends) {
        return function exampleVM(options) {

            var friends = ko.observableArray([]).extend({
                rateLimit: {
                    timeout: 500,
                    method: "notifyWhenChangesStop"
                }
            });
            var currentTab = ko.observable("before");

            function getSamplePostFrom(samples) {
                return samples[Math.floor(Math.random() * (samples.length))];
            }

            if (options && options.generate) {
                generateFriends(options.generate)
                    .then(function (newfriends) {
                        friends(newfriends);
                    });
            } else if (options && options.loadFriends) {
                $.get("js/friends/" + options.loadFriends + ".txt")
                    .then(function (f) {
                        friends(JSON.parse(f));
                    }, function (err) {
                        alert(JSON.stringify(err));
                    });
            }

            var generating = ko.computed(function () {
                if (options && options.generate) return friends().length < options.generate;
                return false;
            });

            var keys = ko.computed(function () {
                return friends().map(function (f) {
                    return openpgp.key.readArmored(f.key.publicKeyArmored).keys[0];
                });
            });

            var encrypting = ko.observable(false);
            var feed = ko.observable("");
            var posts = ko.observableArray([]);
            var currentPost = ko.observable("");


            function post(content) {
                posts().push({
                    datetime: new Date(),
                    content: content || currentPost()
                });
            }

            if (options && options.loadFeed) {
                $.get("js/feeds/" + options.loadFeed + ".txt")
                    .then(function (f) {
                        posts(JSON.parse(f));
                    }, function (err) {
                        alert(JSON.stringify(err));
                    });
            } else if (options && options.generateFeed) {
                $.get("js/feeds/" + options.feed + ".txt")
                    .then(function (sampleResults) {
                        var samples = JSON.parse(sampleResults);
                        var newposts = [];
                        for (var i = options.generateFeed; i > -1; i--) {
                            newposts.push(getSamplePostFrom(samples));
                        }
                        posts(newposts);
                    });
            }

            var received = ko.observable("");

            var testing = ko.observable();

            function encryptFeed(feedString, options) {
                var compession = options.compress;
                currentTab("after");
                encrypting(true);
                openpgp.initWorker("js/vendor/openpgp.worker.min.js");

                openpgp.encryptMessage(keys(), feedString)
                    .then(function (pgped) {
                        feed(pgped);
                        currentPost("");
                        encrypting(false);
                    });
            }

            function encrypt() {
                var feedObject = ko.toJSON({
                    period: 12345,
                    posts: posts()
                });

                testing({
                    beforeEncryption: JSON.stringify(feedObject)
                });

                if (options && options.precompress) {
                    encryptFeed(JSON.stringify(feedObject), {
                        compressed: true
                    });
                } else {
                    encryptFeed(JSON.stringify(feedObject), {
                        compressed: false
                    });
                }
            }

            function decrypt(user) {
                var pk = openpgp.key.readArmored(user.key.privateKeyArmored).keys[0];
                pk.decrypt(user.user);
                openpgp.decryptMessage(pk, openpgp.message.readArmored(feed()))
                    .then(function (decrypted) {
                        testing({
                            beforeEncryption: testing().beforeEncryption,
                            afterDecryption: decrypted,
                            comparison: JSON.stringify({
                                "length before": testing().beforeEncryption.length,
                                "length after": decrypted.length
                            })
                        });
                        received(decrypted);
                    });
            }

            return {
                tab: currentTab,
                friends: friends,
                current: currentPost,
                posts: posts,
                feed: feed,
                post: function (p) {
                    post();
                },
                encrypt: function () {
                    encrypt();
                },
                decrypt: function (u) {
                    decrypt(u);
                },
                received: received,
                encrypting: encrypting,
                generating: generating,
                comparison: {
                    originalsize: ko.computed(function () {
                        var t = posts();
                        return JSON.stringify(posts()).length;
                    }),
                    encryptedsize: ko.computed(function () {
                        return feed().length;
                    }),
                    difference: {
                        raw: ko.computed(function () {
                            var t = posts();
                            return feed().length - JSON.stringify(posts()).length;
                        }),
                        percentage: ko.computed(function () {
                            var t = posts();
                            return ((feed().length - JSON.stringify(posts()).length) / (JSON.stringify(posts()).length)) * 100;
                        })
                    }
                },
                testing: testing
            };

        }
    });