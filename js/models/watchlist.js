var app = app || {};

(function () {
    'use strict';
    app.Watchlist = Backbone.Model.extend({
        urlRoot: 'http://umovie.herokuapp.com/watchlists',
        defaults: {
            name : '',
            movies: new app.WatchlistMovies(),
            owner: new app.Owner(),
            id: null
        },
        parse: function (response) {
            return response;
        }
    });
})();