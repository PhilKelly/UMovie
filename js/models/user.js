var app = app || {};

(function () {
    'use strict';
    app.User = Backbone.Model.extend({
        urlRoot: 'http://umovie.herokuapp.com/users',
        defaults: {
            email : '',
            name : '',
            id: null
        },
        parse: function (response) {
            return response;
        }
    });
})();