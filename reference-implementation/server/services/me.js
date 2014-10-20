if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(["datastorage"]
    , function (datastorage) {
        return function Me(user) {
            var me = this;

            this.get = function get() {
                return datastorage.person.read(user);
            }

            this.update = function update(details) {
                return datastorage.person.update(user, details);
            }

            this.create = function create(user, details) {
                return datastorage.person.create(user, details);
            }

            this.friends = {
                add: function addFriend(person) {
                    return datastorage.relationships.create("friend", { start: { person: user }, end: { person: person } });
                },
                remove: function removeFriend(person) {

                },
                list: function listFreinds() {

                }
            };

            this.requests = {
                list: function getRequests() {

                },
                reject: function rejectRequest(person) {

                }
            };

            this.enemies = {
                add: function addFriend(person) {

                },
                remove: function removeFriend(person) {

                },
                list: function listFreinds() {

                }
            };
        };
    });