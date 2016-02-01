(function () {
    'use strict';

    app.TvShowEpisode = Backbone.Model.extend({
        defaults: {
            wrapperType: '',
            kind: '',
            artistId: '',
            collectionId: '',
            trackId: '',
            artistName: '',
            collectionName: '',
            trackName: '',
            collectionCensoredName: '',
            trackCensoredName: '',
            artistViewUrl: '',
            collectionViewUrl: '',
            trackViewUrl: '',
            previewUrl: '',
            artworkUrl30: '',
            artworkUrl60: '',
            artworkUrl100: '',
            collectionPrice: '',
            trackPrice: '',
            collectionHdPrice: '',
            trackHdPrice: '',
            releaseDate: '',
            collectionExplicitness: '',
            trackExplicitness: '',
            discCount: '',
            discNumber: '',
            trackCount: '',
            trackNumber: '',
            trackTimeMillis: '',
            country: '',
            currency: '',
            primaryGenreName: '',
            contentAdvisoryRating: '',
            shortDescription: '',
            longDescription: '',
            radioStationUrl: ''
        },
        parse: function (response) {
            return response;
        }
    });
})();
