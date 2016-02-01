var app = app || {};

(function () {
    'use strict';

    app.TvShow = Backbone.Model.extend({
        urlRoot: 'http://umovie.herokuapp.com/tvshows/season',
        defaults: {
            wrapperType: '',
            collectionType: '',
            artistId: '',
            collectionId: '',
            artistName: '',
            collectionName: '',
            collectionCensoredName: '',
            artistViewUrl: '',
            collectionViewUrl: '',
            artworkUrl60: '',
            artworkUrl100: '',
            collectionPrice: '',
            collectionHdPrice: '',
            collectionExplicitness: '',
            contentAdvisoryRating: '',
            trackCount: '',
            copyright: '',
            country: '',
            currency: '',
            releaseDate: '',
            primaryGenreName: '',
            longDescription: ''
        },
        parse: function (response, options) {
            return options.collection ? response : response.results[0];
        }
    });
})();