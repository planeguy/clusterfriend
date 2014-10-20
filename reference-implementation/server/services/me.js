define(["es6-promise"]
    , function (es6p) {
        var Promise = es6p.Promise;
        return function Me(user) {
            var me = this;

            function get() {
            }

            function update(details) {

            }

            this.friends = {
                add: function addFriend(person) {

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