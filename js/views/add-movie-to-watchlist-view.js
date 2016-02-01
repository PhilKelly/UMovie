var app = app || {};

(function ($) {
    'use strict';

    var AddToWatchlistView = Backbone.View.extend({

        el: '.movie-add-watchlist',
        movie: null,
        collection: new app.Watchlists(),
        addMovieToWatchlistTemplate: _.template($('#add-movie-to-watchlist-template').html()),

        events:{
            'click .movie-add-watchlist':'addMovieToWatchlist'
        },


        render: function (movieID) {
            var that = this;
            that.movie = new app.Movie({id: movieID});
            var complete = _.invoke([that.movie], 'fetch');
            that.collection.fetch({
                success: function () {
                    that.$el.html(that.addMovieToWatchlistTemplate({
                        watchlists: that.collection.models,
                        movie: that.movie.attributes.results[0]
                    }));
                }
            });
        },

        get: function (options) {
            var that = this;
            if (options.movieID) {
                that.render(options.movieID);
            }

        },

        addMovieToWatchlist: function (e){
            var that = this;
            var currentMovie = that.movie.attributes.results[0];
            var watchlistID = $(e.currentTarget).data("watchlist-id");
            var watchlistData = new app.WatchlistMovie();
            watchlistData.urlRoot = watchlistData.urlRoot.replace(':id', watchlistID);
            watchlistData.save(currentMovie, {
                success: function (){
                    that.$el.find('#successAddMovieNotif').show();
                },
                error: function (error) {
                    that.$el.find('#errorAddMovieNotif').show();
                }
            });
            e.preventDefault();
            return false; //Permet de ne pas agir sur le collapse de l'accordion
        },

        resetNotification: function () {
            this.$el.find('#successAddMovieNotif').hide();
            this.$el.find('#errorAddMovieNotif').hide();
        },

        closeNotification : function (e) {
            $(e.currentTarget.parentElement).hide();
        }

    });

    app.AddToWatchlistView = new AddToWatchlistView();
})(jQuery);
