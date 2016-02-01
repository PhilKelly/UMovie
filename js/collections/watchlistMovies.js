var app = app || {};

(function () {
    'use strict';

    app.WatchlistMovies = Backbone.Collection.extend({
        urlRoot: 'http://umovie.herokuapp.com/watchlists/:id/movies',
        model: app.WatchlistMovie,
        parse : function (response){
            return response;
        }
    });

})();

