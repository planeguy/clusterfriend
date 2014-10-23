var requirejs = require("requirejs");

requirejs.config({
    paths: {
        "datastorage": "storage/memory-storage"
    },
    nodeRequire: require
});