var requirejs = require("requirejs");
(require("es6-promise")).polyfill();

require("./require-config");
requirejs(["restify", "server-config", "services/person", "services/posts"]
    , function (restify, serverconfig, Person, Posts) {
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

        

        server.listen(serverconfig.port, function () {
            console.log("%s listening at %s", serverconfig.clustername, serverconfig.url);
        });
    });