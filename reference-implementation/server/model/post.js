﻿if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define([]
    , function () {

        return function Post(url, poster, datetime, markdown, html) {
            var me = this;
            this.url=
            this.poster = poster;
            this.date = datetime;
            this.markdown = markdown;
            this.html = html;
        };

    });