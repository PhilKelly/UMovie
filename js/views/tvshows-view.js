var app = app || {};

(function ($) {
    'use strict';

    var TvShowsView = Backbone.View.extend({

        el: '.tvshows',
        collection: app.TvShows,
        autocomplete: null,
        tvShowsTemplate: _.template($('#tvshows-template').html()),
        events: {
            'click #tvshow-search-btn': 'searchTvShows',
            'keyup #tvshow-search-text': 'keyPressEventHandler'
        },

        initialize: function () {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function () {
            var that = this;
            that.$el.html(that.tvShowsTemplate({
                tvshows: that.collection.models.sort(function (a, b) {
                    var x = a.get('collectionName').toLowerCase();
                    var y = b.get('collectionName').toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0;
                })
            }));

            var searchTextField = document.getElementById("tvshow-search-text");
            this.autocomplete = new Awesomplete(searchTextField);
        },

        searchTvShows: function() {
            var searchText = $("#tvshow-search-text").val();
            var oldURL =  app.TvShows.url;
            var that = this;
            app.TvShows.url = app.TvShows.url + "?q=" +encodeURIComponent(searchText);
            app.TvShows.fetch({
                success: function(data){
                    app.TvShows.url = oldURL;
                    that.render();
                },
                error: function () {
                    app.TvShows.url = oldURL;
                }
            });
        },

        keyPressEventHandler: function (event) {
            if (event.keyCode == 13) {
                this.$('#tvshow-search-btn').click();
            }

            else
            {
                var searchText = $("#tvshow-search-text").val();
                if(searchText.length > 2 && searchText.length < 5)
                    this.updateAutoCompleteData(searchText)
            }
        },

        updateAutoCompleteData : function(searchText)
        {
            var that = this;
            app.TvShows.url = "http://umovie.herokuapp.com/search/tvshows/seasons?q=" + searchText + "&limit=0";
            app.TvShows.fetch({
                success: function () {
                    var namesArray = new Array();
                    for(var i=0; i< app.TvShows.length; i++)
                    {
                        namesArray.push(app.TvShows.models[i].attributes.collectionName);
                    }

                    that.autocomplete.list = namesArray;
                }
            });

            app.TvShows.url = "http://umovie.herokuapp.com/search/tvshows/seasons";
            app.TvShows.reset();

        },

        get: function () {
            this.render();
        }
    });

    app.TvShowsView = new TvShowsView();
})(jQuery);