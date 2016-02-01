var app = app || {};

(function ($) {
    'use strict';

    var MoviesView = Backbone.View.extend({

        el: '.movies',

        autocomplete: null,
        collection: app.Movies,
        moviesTemplate: _.template($('#movies-template').html()),

        events:{
            'click #movie-search-btn':'searchMovies',
            'keyup #movie-search-text' : 'keyPressEventHandler'
        },
        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            var that = this;
            that.$el.html(that.moviesTemplate({
                movies: that.collection.models
            }));

            var searchTextField = document.getElementById("movie-search-text");
            this.autocomplete = new Awesomplete(searchTextField);

        },

        searchMovies: function(){
            var searchText = $("#movie-search-text").val();
            var oldURL =  app.Movies.url;
            var that = this;
            app.Movies.url = app.Movies.url + "?q=" +encodeURIComponent(searchText);
            app.Movies.fetch({
                success: function(){
                    app.Movies.url = oldURL;
                    that.render();
                },
                error: function () {
                    app.Movies.url = oldURL;
                }
            });
        },

        keyPressEventHandler : function(event){
            if(event.keyCode == 13){
                this.$("#movie-search-btn").click();
            }

            else
            {
                var searchText = $("#movie-search-text").val();
                if(searchText.length > 2 && searchText.length < 5)
                    this.updateAutoCompleteData(searchText)
            }
        },

        updateAutoCompleteData : function(searchText)
        {
            var that = this;
            app.Movies.url = "http://umovie.herokuapp.com/search/movies?q=" + searchText + "&limit=0";
            app.Movies.fetch({
                success: function () {
                    var namesArray = new Array();
                    for(var i=0; i< app.Movies.length; i++)
                    {
                        namesArray.push(app.Movies.models[i].attributes.trackName);
                    }

                    that.autocomplete.list = namesArray;
                }
            });

            app.Movies.url = "http://umovie.herokuapp.com/search/movies";
            app.Movies.reset();

        },

        get: function () {
            this.render();
        }

    });
    app.MoviesView = new MoviesView();

})(jQuery);
