var app = app || {};

(function () {
    'use strict';
    app.WatchlistMovie = Backbone.Model.extend({
        urlRoot: 'http://umovie.herokuapp.com/watchlists/:id/movies',
        defaults: {
            "wrapperType": '',
            "kind": '',
            "trackId": null,
            "artistName": '',
            "trackName": '',
            "trackCensoredName": '',
            "trackViewUrl": '',
            "previewUrl": '',
            "artworkUrl30": '',
            "artworkUrl60": '',
            "artworkUrl100": '',
            "collectionPrice": 0,
            "trackPrice": 0,
            "trackRentalPrice": 0,
            "collectionHdPrice": 0,
            "trackHdPrice": 0,
            "trackHdRentalPrice": 0,
            "releaseDate": '',
            "collectionExplicitness": '',
            "trackExplicitness": '',
            "trackTimeMillis": 0,
            "country": '',
            "currency": '',
            "primaryGenreName": '',
            "contentAdvisoryRating": '',
            "longDescription": '',
            "radioStationUrl": ''
        },
        parse: function (response) {
            
            return response;
        }
    });
})();