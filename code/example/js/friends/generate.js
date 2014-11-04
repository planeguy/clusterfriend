define(["openpgp", "es6-promise"],
    function (openpgp, es6p) {
        var Promise = es6p.Promise;

        return function generateFriends(number) {
            var promises = [];
            openpgp.initWorker("js/vendor/openpgp.worker.min.js");
            for (var i = 0; i < number; i++) {
                promises.push(openpgp.generateKeyPair({ numBits: 512, userId: "friend" + i, passphrase: "friend" + i })
                    .then((function (i) {
                        return function (key) {
                            return {
                                user: "friend" + i,
                                key: key
                            };
                        }
                    })(i))
                );
            }
            return Promise.all(promises);
        };
    });