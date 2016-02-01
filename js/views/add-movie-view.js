var app = app || {};

(function ($) {
    'use strict';

    var AddMovieView = Backbone.View.extend({

        el: '.watchlist-add-movie',
        currentWatchList: {},
        movies: [],
        addMovieTemplate: _.template($('#add-movie-template').html()),

        events: {
            'click .accordion-movie-add': 'addMovieToWatchlist',
            'click #movie-search-btn' : 'searchMovie',
            'keyup #movie-search-text' : 'keyPressEventHandler',
            'click .close' : 'closeNotification'
        },

        fetchWatchlist: function (watchlistID) {
            var that = this;
            that.currentWatchList = new app.Watchlist({id: watchlistID});
            that.currentWatchList.fetch({
                success: function () {
                    that.render();
                }
            });
        },

        render: function () {
            this.$el.html(this.addMovieTemplate({
                watchlist: this.currentWatchList.attributes,
                movies: this.movies
            }));
        },

        searchMovie: function () {
            var that = this;
            var searchText = $("#movie-search-text").val();
            var oldURL =  app.MoviesSearch.url;
            app.MoviesSearch.url = app.MoviesSearch.url + "?q=" +encodeURIComponent(searchText);
            app.MoviesSearch.fetch({
                success: function (data) {
                    that.movies = data.models;
                    that.render();
                    app.MoviesSearch.url = oldURL;
                },
                error: function (error){
                    console.log('Something went wrong!' + error.message);
                    app.MoviesSearch.url = oldURL;
                }
            })
        },

        addMovieToWatchlist: function (e){
            var that = this;
            that.resetNotification();
            var movieID = $(e.currentTarget).data("movie-id");
            var movie = _.find(that.movies, function (obj) {return obj.attributes.trackId === movieID});
            var movieData = new app.WatchlistMovie();
            movieData.urlRoot = movie.urlRoot.replace(':id', that.currentWatchList.id);
            movieData.save(movie.attributes, {
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
        },

        keyPressEventHandler : function(event){
            if(event.keyCode == 13){
                this.searchMovie();
            }
        }

    });

    app.AddMovieView = new AddMovieView();
})(jQuery);