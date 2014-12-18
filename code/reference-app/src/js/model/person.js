define([],
    function () {
        return function person(spec) {
            var id,
                name,
                feed,
                image,
                profile,
                key;

            if (spec) {
                id = spec.id;
                name = spec.name;
                feed = spec.feed;
                image = spec.image;
                profile = spec.profile;
                key = spec.key;
            }

            return {
                id: id,
                name: name,
                feed: feed,
                image: image,
                profile: profile,
                key: key
            };
        };
    });