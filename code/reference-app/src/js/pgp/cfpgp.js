define(["model/post"],
    function (post, pgp) {
        return function (options) {

            var pk,
                read;

            if (options) {
                if (options.pk) {
                    (function () {
                        var epk = openpgp.key.readArmored(options.pk.privateKeyArmored).keys[0];;
                    })
                }
                read = options.read;
            }

            function decryptPost(post) {
                if (post.private) {
                    var msg = openpgp.message.readArmored(post.private);
                    msg.decrypt(pk);
                    var decoded = msg.getLiteralData();
                    post.content = JSON.parse(decoded);
                } else {
                    post.content = post.public;
                }
            }

            function decryptFeed(feed) {
                var msg = openpgp.message.readArmored(feed),
                    unread = [];
                msg.decrypt(pk);
                var decoded = msg.getLiteralData();
                var posts = JSON.parse(decoded).map(post);
                for (var p = posts.length - 1; p >= 0; p--) {
                    if (read && read.indexOf(posts[p].id) < 0) {
                        decryptPost(posts[p]);
                        unread.push(posts[p]);
                    }
                }
                return unread;
            }

            return {
                feed: {
                    decryptUnread: function (f) {
                        return decryptFeed(f);
                    }
                }
            };
        };
    });