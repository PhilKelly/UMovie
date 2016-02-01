var app = app || {};

(function () {
    'use strict';

    app.Watchlists = Backbone.Collection.extend({
        model: app.Watchlist,
        url: 'http://umovie.herokuapp.com/watchlists'
    });

})();
