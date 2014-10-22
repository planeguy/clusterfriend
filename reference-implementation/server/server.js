var requirejs = require("requirejs");
(require("es6-promise")).polyfill();

requirejs.config({
    paths: {
        "datastorage": "storage/memory-storage"
    },
    nodeRequire: require
});

requirejs(["restify", "services/me", "services/people"]
    , function (restify, Me, People) {
        var server = restify.createServer();
        server.use(restify.bodyParser());
        server.use(restify.queryParser());
        server.use(restify.gzipResponse());
        server.use(restify.authorizationParser());
        //server.use(restify.CORS());

        function authenticatedUser(user) {
            console.log("user: ", user);
            if (user != "anonymous") {
                return user;
            } else {
                throw new Error("all users must be authenticated");
            }
        }

        

        server.listen(12345, function () {
            console.log("clusterfriend listening at %s", server.url);
        });
    });