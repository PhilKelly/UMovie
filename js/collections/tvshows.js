var app = app || {};

(function () {
    'use strict';

    var TvShows = Backbone.Collection.extend({
        model: app.TvShow,
        url: 'http://umovie.herokuapp.com/search/tvshows/seasons',
        parse: function (response) {
            return response.results;
        }
    });

    app.TvShows = new TvShows();
})();
