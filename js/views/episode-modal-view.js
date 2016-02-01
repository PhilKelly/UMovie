var app = app || {};

(function ($) {
    'use strict';

    var EpisodeModalView = Backbone.View.extend({

        el: '#episodeModal',
        episodeModalTemplate: _.template($('#episode-modal-template').html()),

        events: {
            'click #closeModal' : 'close'
        },

        show: function (episode) {
            var that = this;
            episode.attributes.readableLength = convertMsToReadableTime(episode.attributes.trackTimeMillis);;

            var renderModalWithYoutubeVideo = function (youtubeID){
                that.$el.html(that.episodeModalTemplate({
                    episode: episode.attributes,
                    youtubeID: youtubeID
                }));
                that.$el.modal('show');
            };

            youtubeSearch(episode.attributes.collectionName + ' ' +  episode.attributes.trackName + ' trailer', renderModalWithYoutubeVideo);

            function convertMsToReadableTime(time){
                var currentTime = time / 1000;
                var seconds = parseInt(currentTime % 60);
                currentTime /= 60;
                var minutes = parseInt(currentTime % 60);
                currentTime /= 60;
                var hours = parseInt(currentTime % 24);
                return hours + 'h ' + minutes + 'min ' + seconds + 'sec ';
            }
        },

        close: function (){
            this.$el.empty();
            this.$el.modal('hide');
        }

    });

    app.EpisodeModalView = new EpisodeModalView();
})(jQuery);