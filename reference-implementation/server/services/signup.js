if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(["model/person", "datastorage"]
    , function (Person, datastorage) {
        return function Signup() {
            var me = this;

            this.register = function register(details) {
                if (details.user && details.email && !datastorage.registrations[details.user])
                {
                    details.confirmationCode = "it's me, " + details.user;
                    datastorage.registrations[details.user] = details;
                    //emailer.email({
                    //    to: details.email,
                    //    from: "clusterfriendadmin@cf.io",
                    //    message: "confirm with this code: '" + details.confirmationCode + "'"
                    //});
                }
            };
            this.confirm = function (user, confirm) {

            };
        }
    });