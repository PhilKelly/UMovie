var app = app || {};

(function () {
    'use strict';

    app.ActorMovies = Backbone.Collection.extend({
        url: 'http://umovie.herokuapp.com/actors/:id/movies',
        model: app.Movie,
        sortByReleaseDateDesc: function () {
            this.comparator = function (model) {
                var releaseDate = model.get("releaseDate");
                releaseDate = releaseDate.toLowerCase();
                releaseDate = releaseDate.split("");
                releaseDate = _.map(releaseDate, function(letter) {
                    return String.fromCharCode(-(letter.charCodeAt(0)));
                });
                return releaseDate;
            };
            this.sort();
        },
        parse: function (response) {
            return response.results;
        }
    });

})();
