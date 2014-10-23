if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define([]
    , function () {
        function Person() {
            var me = this;

            this.profile = {
                get: function get(user, person) {

                },
                update: function update(user, profile) {

                },
                create: function create(user, profile) {

                }
            };

            this.feed = {
                get: function feed(user, person) {

                }
            };

            this.archive = {
                get: function feed(user, person, page) {

                }
            };

            this.friends = {
                get: function (user, person) {

                },
                add: function (user, friend) {

                },
                remove: function (user, friend) {

                }
            }

            this.enemies = {
                get: function (user, person) {

                },
                add: function (user, friend) {

                },
                remove: function (user, friend) {

                }
            }
        };

        return Person;
    });