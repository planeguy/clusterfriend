define([]
    , function () {

        return function Person(user, first, last, imageUrl, profileMd, profileHtml) {
            var me = this;
            this.user = user;
            this.first = first;
            this.last = last;
            this.imageUrl = imageUrl;
            this.profileMarkdown = profileMd;
            this.profileHtml = profileHtml;
        };

    });