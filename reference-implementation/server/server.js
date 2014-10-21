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


        function authenticatedUser(user) {
            console.log("user: ", user);
            if (user != "anonymous") {
                return user;
            } else {
                throw new Error("all users must be authenticated");
            }
        }

        //--~~== ME ==~~--
        server.get("/me", function (req, res, next) {
            var user = authenticatedUser(req.username, req.params.user);
            (new Me(user)).get()
            .then(function (results) {
                res.send(results);
                next();
            }).catch(function (err) {
                //restify error send
                next(err);
            });
        });
        server.put("/me/", function (req, res, next) {
            var user = authenticatedUser(req.username);
            (new Me(user)).update(req.body)
            .then(function (result) {
                res.send(result);
                next();
            }).catch(function (err) {
                //restify error send
                next(err);
            });
        });
        server.post("/me/:user", function (req, res, next) {
            var user = req.params.user;
            (new Me(user)).create(user, req.body)
            .then(function (result) {
                res.send(result);
                next();
            }).catch(function (err) {
                //restify error send
                next(err);
            });
        });
        server.post("/me/friends/:person", function (req, res, next) {
            var user = authenticatedUser(req.username);
            (new Me(user)).friends.add(req.params.person)
            .then(function (result) {
                res.send(result);
                next();
            }).catch(function (err) {
                //restify error send
                next(err);
            });
        });

        server.get("/people/:user", function (req, res, next) {
            var person = req.params.user;
            var user = authenticatedUser(req.username);
            (new People(user, person)).get()
            .then(function (result) {
                res.send(result);
                next();
            }).catch(function (err) {
                next(err);
            });
        });

        server.post("/people/:user/posts", function (req, res, next) {
            var user = authenticatedUser(req.username);
            if (user != req.params.user) throw new Error("unauthorized");
            (new People(user, user)).posts.add(req.body)
            .then(function (result) {
                res.send(result);
                next();
            }).catch(function (err) {
                next(err);
            });
        });
        server.get("/people/:user/posts/:id", function (req, res, next) {
            var user = authenticatedUser(req.username);
            (new People(user, req.params.user)).posts.get(parseInt(req.params.id))
            .then(function (result) {
                res.send(result);
                next();
            }).catch(function (err) {
                next(err);
            });
        });
        server.get("/people/:user/posts/:id/:relationship", function (req, res, next) {
            var user = authenticatedUser(req.username);
            (new People(user, req.params.user)).posts.related(parseInt(req.params.id), req.params.relationship)
            .then(function (result) {
                res.send(result);
                next();
            }).catch(function (err) {
                next(err);
            });
        });

        server.listen(12345, function () {
            console.log("clusterfriend listening at %s", server.url);
        });
    });