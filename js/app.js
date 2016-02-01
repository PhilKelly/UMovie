var app = app || {};

(function () {
    'use strict';
    var UMovieRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'watchlists': 'watchlists',
            'watchlist/:id/movies': 'watchlistMovies',
            'watchlist/:id/addMovies': 'watchlistAddMovies',
            'movie': 'movies',
            'movie/:id': 'singleMovie',
            'movie/addToWatchlist/:id': 'addToWatchlist',
            'tvshows': 'tvshows',
            'tvshows/:id': 'tvshow',
            'actors': 'actors',
            'actors/:id': 'singleActor',
            'users/:id' : 'user',
            'users/:id/watchlists' : 'userWatchlists',
            'users/:id/following' : 'userFollowing',
            'users/:id/search' : 'userSearch'
        }
    });

    app.clearViews = function(){
    //function clearViews() {
        $(".tvshows").empty();
        $(".tvshow").empty();
        $(".global-search").empty();
        $(".actors").empty();
        $(".single-actor").empty();
        $(".watchlist").empty();
        $(".watchlist-movies").empty();
        $(".watchlist-add-movie").empty();
        $(".movies").empty();
        $(".movie-add-watchlist").empty();
        $(".single-movie").empty();
        $(".user-profile").empty();
        $(".user-actions").empty();

    };

    app.UMovieRouter = new UMovieRouter();
    app.NavBarView.render();

    app.UMovieRouter.on('route:home', function () {
        app.clearViews();
    });
    app.UMovieRouter.on('route:tvshows', function () {
        app.clearViews();
        app.TvShowsView.get();
    });
    app.UMovieRouter.on('route:tvshow', function (tvShowID) {
        app.clearViews();
        app.TvShowView.get({tvShowID: tvShowID});
    });
    app.UMovieRouter.on('route:watchlists', function () {
        app.clearViews();
        app.WatchlistView.get();
    });
    app.UMovieRouter.on('route:actors', function () {
        app.clearViews();
        app.ActorsView.get();
    });
    app.UMovieRouter.on('route:singleActor', function (actorID) {
        app.clearViews();
        app.SingleActorView.get({actorID : actorID});
    });
    app.UMovieRouter.on('route:watchlistMovies', function (watchlistID) {
        app.clearViews();
        app.WatchlistMoviesView.get({watchlistID: watchlistID});
    });

    app.UMovieRouter.on('route:watchlistAddMovies', function (watchlistID) {
        app.clearViews();
        app.AddMovieView.fetchWatchlist(watchlistID);
    });

    app.UMovieRouter.on('route:singleMovie', function (movieID) {
        app.clearViews();
        app.SingleMovieView.get({movieID : movieID});
    });

    app.UMovieRouter.on('route:movies', function () {
        app.clearViews();
        app.MoviesView.get();
    });

    app.UMovieRouter.on('route:addToWatchlist', function (movieID) {
        app.clearViews();
        app.AddToWatchlistView.get({movieID: movieID});
    });

    app.UMovieRouter.on('route:user', function (userId) {
        app.clearViews();
        app.UserProfileView.get({userId : userId});
        app.UserWatchlistView.get({userId : userId});
    });

    app.UMovieRouter.on('route:userWatchlists', function (userId) {
        app.UserProfileView.get({userId : userId});
        app.UserWatchlistView.get({userId : userId});
    });

    app.UMovieRouter.on('route:userFollowing', function (userId) {
        app.UserProfileView.get({userId : userId});
        app.UserFollowingView.get({userId : userId});
    });

    app.UMovieRouter.on('route:userSearch', function (userId) {
        app.UserProfileView.get({userId : userId});
        app.UserSearchView.get({userId : userId});
    });

    Backbone.history.start();
})();