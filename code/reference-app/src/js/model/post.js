define([],
    function () {
        return function post(spec) {
            var id,
                date,
                poster,
                public,
                private,
                content;

            if (spec) {
                id = spec.id;
                date = spec.date;
                poster = spec.poster;
                public = spec.public;
                private = spec.private;
            }

            if (private) {
                //decrypte private
                //if decrypted, content=decrypted
                //else content=public
            } else {
                content = public;
            }

            return {
                id: id,
                date: date,
                poster: poster,
                public: public,
                private: private,
                content: content
            };
        };

    });