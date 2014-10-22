define([]
    , function () {
        return function Posts() {
            var me = this;
            this.get = function get(user, person) {

            };
            this.create = function create(person, post) {

            };
            this.post = {
                get: function get(user, person, postid) {

                },
                update: function update(person, postid, post) {

                },
                "delete": function deletepost(person, postid) {

                },
                relationship: {
                    get: function get(user, person, postid, relationship) {

                    },
                    create: function create(user, person, postid, relationship) {

                    }
                }
            }
        };
    });