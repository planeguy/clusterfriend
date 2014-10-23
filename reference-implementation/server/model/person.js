if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define([]
    , function () {

        return function Person(user, email, image, personal) {
            var me = this;
            this.user = user;
            this.email = email;
            this.image = image;
            this.personal = personal;
        };

    });