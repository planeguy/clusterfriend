﻿define([]
    , function () {
        return function Notification(id, post, person, message) {
            var me = this;
            this.id = id;
            this.post = post;
            this.person = person;
            this.message = message;
        };
    });