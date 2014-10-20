if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define([]
    , function () {

        return function Person(user, details) {
            var me = this;
            this.user = user;

            this.setDetails = function (d) {
                me.email = d.email;
                me.first = d.first;
                me.last = d.last;
                me.imageUrl = d.imageUrl;
                me.profileMarkdown = d.profileMd;
                me.profileHtml = d.profileHtml;
            };
            me.setDetails(details);
        };

    });