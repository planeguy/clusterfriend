if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define([]
    , function () {

        return function Post(id, datetime, details) {
            var me = this;
            this.id = id;
            this.date = datetime;

            this.setDetails = function setDetails(d) {
                me.markdown = d.markdown;
                me.html = d.html;
                me.images = d.images;
                me.link = d.link;
            };

            me.setDetails(details);
        };

    });