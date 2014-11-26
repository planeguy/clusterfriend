requirejs.config({
    baseUrl: "js",
    paths: {
        "knockout": "vendor/knockout-3.2.0",
        "knockout.mapper": "vendor/knockout.mapper",
        "openpgp": "vendor/openpgp.min",
        "openpgp.worker": "vendor/openpgp.worker",
        "text": "vendor/text",
        "jquery": "vendor/jquery-2.1.1.min",
        "es6-promise": "vendor/es6-promise-2.0.0.min",
        "gzip": "vendor/gzip"
    },
    shim: {
        "knockout.mapper": {
            "deps": ["knockout"]
        }
    }
});