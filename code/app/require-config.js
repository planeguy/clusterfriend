requirejs.config({
    baseUrl: "js",
    paths: {
        "knockout": "vendor/knockout-3.2.0",
        "knockout.mapper": "vendor/knockout.mapper",
        "openpgp": "vendor/openpgp.min",
        "openpgp.worker": "vendor/openpgp.worker",
        "text": "vendor/text",
        "jquery":"vendor/jquery-2.1.1.min"
    },
    shim: {
        "knockout.mapper": {
            "deps": ["knockout"]
        }
    }
});