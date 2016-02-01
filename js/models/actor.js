var app = app || {};

(function () {
    'use strict';
    app.Actor = Backbone.Model.extend({
        urlRoot: 'http://umovie.herokuapp.com/actors',
        defaults: {
            wrapperType: '',
            artistType: '',
            artistName: '',
            artistLinkUrl: '',
            artistId: null,
            amgArtistId: 0,
            primaryGenreName: '',
            primaryGenreId: 0,
            radioStationUrl: ''
        },
        parse: function (response, options) {
            if(options.collection) {
                this.wrapperType = response.wrapperType;
                this.artistType = response.artistType;
                this.artistName = response.artistName;
                this.artistLinkUrl = response.artistLinkUrl;
                this.artistId = response.artistId;
                this.amgArtistId = response.amgArtistId;
                this.primaryGenreName = response.primaryGenreName;
                this.primaryGenreId = response.primaryGenreId;
                this.radioStationUrl = response.radioStationUrl;
                return response;
            }else {
                this.wrapperType = response.results[0].wrapperType;
                this.artistType = response.results[0].artistType;
                this.artistName = response.results[0].artistName;
                this.artistLinkUrl = response.results[0].artistLinkUrl;
                this.artistId = response.results[0].artistId;
                this.amgArtistId = response.results[0].amgArtistId;
                this.primaryGenreName = response.results[0].primaryGenreName;
                this.primaryGenreId = response.results[0].primaryGenreId;
                this.radioStationUrl = response.results[0].radioStationUrl;
                return this;
            }
        }

    });
})();