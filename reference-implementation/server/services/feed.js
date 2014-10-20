if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define([]
    , function () {
        return function Feed(user) {
            var me = this;

            this.list = function list(nextafter) {
                //get X posts, count(relatedpost) 
                //  WHERE poster is a friend of user
                //  ORDER BY post.datetime desc
            };
        };
    });