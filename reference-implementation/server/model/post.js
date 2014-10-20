define([]
    , function () {

        return function Post(id, datetime, md, html, images, link) {
            var me = this;
            this.id = id;
            this.date = datetime;
            this.markdown = md;
            this.html = html;
            this.images = images;
            this.link = link;

            this.poster = null;
        };

    });