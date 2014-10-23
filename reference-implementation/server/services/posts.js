if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define([]
    , function () {
        function Posts() {
            var me = this;
            this.get = function get(user, person) {

            };
            this.create = function create(person, post) {

            };

            var relationship = {
                get: function get(user, person, postid, relationship) {

                },
                create: function create(user, person, postid, relationship) {

                },
                "delete": function create(user, person, relationshipid) {

                }
            }

            this.post = {
                get: function get(user, person, postid) {

                },
                update: function update(person, postid, post) {

                },
                "delete": function deletepost(person, postid) {

                }
            }

            (function (post, relationship, relationships) {
                for (var i = relationships.length - 1; i > 0; i--) {
                    post[relationships[i].pural] = (function (r) {
                        return {
                            get: function (user, person, postid) {
                                return relationship.get(user, person, postid, r)
                            },
                            create: function (user, person, postid) {
                                return relationship.create(user, person, postid, r)
                            },
                            "delete": function (user, person, relationshipid) {
                                return relationship.delete(user, person, relationshipid)
                            }
                        };
                    })(relationships[i].single);
                }
            })(me.post, relationship [
                { single: "reply", plural: "replies" },
                { single: "shared", plural: "shares" },
                { single: "tagged", plural: "tags" }
            ]);
        };

        return Posts;
    });