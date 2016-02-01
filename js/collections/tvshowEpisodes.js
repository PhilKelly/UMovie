var app = app || {};

(function () {
    'use strict';

    app.TvShowEpisodes = Backbone.Collection.extend({
        url: 'http://umovie.herokuapp.com/tvshows/season/:id/episodes',
        model: app.TvShowEpisode,
        parse : function (response){
            return response.results;
        }
    });

})();
