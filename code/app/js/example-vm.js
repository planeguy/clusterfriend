define(["jquery", "knockout", "openpgp", "text!./feeds/single-post.txt" ],
    function ($, ko, openpgp, singlepost) {
        return function exampleVM(options) {
            var friends = ko.observableArray([]).extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });

            function generateFriends(number) {
                openpgp.initWorker("js/vendor/openpgp.worker.min.js");
                for (var i = 0; i < number; i++) {
                    openpgp.generateKeyPair({ numBits: 512, userId: "friend" + i, passphrase: "friend" + i })
                    .then((function (i) {
                        return function (key) {
                            friends.push({
                                user: "friend" + i,
                                key: key
                            });
                        }
                    })(i));
                }
            }
            if (options && options.generate) {
                generateFriends(options.generate);
            }
            else if (options && options.loadFriends) {
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
            })

            var encrypting = ko.observable(false);
            var feed = ko.observable("");
            var posts = ko.observableArray([]);
            var currentPost = ko.observable("");
            function encryptFeed() {
                encrypting(true);
                openpgp.initWorker("js/vendor/openpgp.worker.min.js");
                openpgp.encryptMessage(
                        keys(),
                        JSON.stringify(posts())
                    ).then(function (result) {
                        feed(result);
                        currentPost("");
                        encrypting(false);
                    }).catch(function (err) {
                        console.log(err);
                        encrypting(false);
                    });
            }
            function post(content) {
                posts().push({
                    datetime: new Date(),
                    content: content || currentPost()
                });
            }

            if (options && options.generateFeed) {
                var parsedpost = JSON.parse(singlepost);
                var newposts = [];
                for (var i = options.generateFeed; i > -1; i--) {
                    newposts.push(parsedpost);
                }
                posts(newposts);
            } else if (options && options.loadFeed) {
                $.get("js/feeds/" + options.loadFeed + ".txt")
                .then(function (f) {
                    posts(JSON.parse(f));
                }, function (err) {
                    alert(JSON.stringify(err));
                });
            }

            var received = ko.observable("");
            function decrypt(user) {
                var pk = openpgp.key.readArmored(user.key.privateKeyArmored).keys[0];
                pk.decrypt(user.user);
                openpgp.decryptMessage(pk, openpgp.message.readArmored(feed()))
                .then(function (plain) {
                    received(plain)
                }).catch(function (err) {
                    received(err);
                });
            }

            return {
                friends: friends,
                current: currentPost,
                posts: posts,
                feed: feed,
                post: function (p) { post(); },
                encrypt: function(){ encryptFeed(); },
                decrypt: function (u) { decrypt(u); },
                received: received,
                encrypting: encrypting,
                generating: generating,
                comparison: {
                    originalsize: ko.computed(function () { var t = posts(); return JSON.stringify(posts()).length; }),
                    encryptedsize: ko.computed(function () { return feed().length; }),
                    difference: {
                        raw: ko.computed(function () { var t = posts(); return feed().length - JSON.stringify(posts()).length; }),
                        percentage: ko.computed(function () { var t = posts(); return ((feed().length - JSON.stringify(posts()).length) / (JSON.stringify(posts()).length)) * 100; })
                    }
                }
            };

        }
    });