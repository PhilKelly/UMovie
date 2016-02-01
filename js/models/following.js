var app = app || {};

(function () {
    'use strict';
    app.Following = Backbone.Model.extend({
        urlRoot: 'http://umovie.herokuapp.com/follow',
        idAttribute: "_id",
        defaults: {
            "_id": null,
            "name": "",
            "email": ""
        },
        parse: function (response) {

            return response;
        }
    });
})();