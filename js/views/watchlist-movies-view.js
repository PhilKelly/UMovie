var app = app || {};

(function ($) {
    'use strict';

     var WatchlistMoviesView = Backbone.View.extend({

        el: '.watchlist-movies',
        watchlist: null,

        watchlistMoviesTemplate: _.template($('#watchlist-movies-template').html()),

        events: {
            "click .movie-remove": "removeMovie"
        },

        removeMovie: function (e) {
            var that = this;
            var movieID = $(e.currentTarget).data("movie-id");
            var movieModel = new app.WatchlistMovie({id: movieID});
            movieModel.urlRoot = movieModel.urlRoot.replace(':id', this.watchlist.id);
            movieModel.destroy({
                success: function (model, response){
                    that.render(response.id);
                },
                error: function (error){
                    console.log("Something wrong happened!" + error);
                }
            });
        },

        render: function (watchlistID) {
            var that = this;
            that.watchlist = new app.Watchlist({id: watchlistID});
            that.watchlist.fetch({
                success: function (data) {
                    that.$el.html(that.watchlistMoviesTemplate({
                        watchlist: data.attributes
                    }));
                }
            });
        },
        get: function (options) {
            var that = this;
            if (options.watchlistID) {
                that.render(options.watchlistID);
            }

        }
    });

    app.WatchlistMoviesView = new WatchlistMoviesView();
})(jQuery);