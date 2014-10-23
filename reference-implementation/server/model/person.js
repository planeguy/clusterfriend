if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define([]
    , function () {

        return function Person(user, email, url, image, personal) {
            var me = this;
            this.user = user;
            this.url = url;
            this.email = email;
            this.image = image;
            this.personal = personal;
        };

    });