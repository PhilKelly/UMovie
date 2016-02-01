var app = app || {};

(function ($) {
    'use strict';

    var EpisodesView = Backbone.View.extend({

        episodesTemplate: _.template($('#episodes-template').html()),
        episodes : [],

        events: {
            'click #episodes-search-btn': 'searchInEpisodes'
        },

        render: function (episodes) {
            var that = this;
            that.episodes = episodes;
            that.$el.html(that.episodesTemplate({
                episodes: episodes
            }));
            that.delegateEvents();
        },

        searchInEpisodes: function (){
            var that = this;
            var textSearched = $('#episodes-search-text').val();
            var filteredEpisodes = _.filter(that.episodes, function (obj){
                if(obj.attributes.trackName.indexOf(textSearched) > -1)
                    return obj;
            });
            that.renderFilteredEpisodes(filteredEpisodes, textSearched);
        },

        renderFilteredEpisodes: function (filteredEpisodes, textSearched) {
            this.$el.html(this.episodesTemplate({
                episodes: filteredEpisodes
            }));
            $('#episodes-search-text').val(textSearched);
        }

    });

    app.EpisodesView = new EpisodesView();
})(jQuery);