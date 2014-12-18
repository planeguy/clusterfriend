define(["openpgp", "knockout"],
    function (openpgp, ko) {

        function keypairVM(params) {
            var userid = ko.observable(),
                password = ko.observable(),
                confirmPass = ko.observable();


            function generateFriends() {
                openpgp.initWorker("js/vendor/openpgp.worker.min.js");
                return openpgp.generateKeyPair({
                    numBits: 512,
                    userId: userid,
                    passphrase: password
                }).then(function (key) {
                    return {
                        user: userid,
                        key: key
                    };
                });
            );
        };
    };
});