var app = app || {};

(function () {
    'use strict';

    var Users = Backbone.Collection.extend({
        model: app.User,
        url: 'http://umovie.herokuapp.com/search/users',
        parse: function (response){
            return response;
        }
    });

    app.Users = new Users()
})();
