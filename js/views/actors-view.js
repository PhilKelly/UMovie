var app = app || {};

(function ($) {
    'use strict';

    var ActorsView = Backbone.View.extend({

        el: '.actors',
        autocomplete: null,
        collection: app.Actors,
        actorsTemplate: _.template($('#actors-template').html()),

        events: {
            'click #actor-search-btn': 'searchActors',
            'keyup #actor-search-text': 'keyPressEventHandler'
        },

        initialize: function () {
            _.bindAll(this, 'render');

        },

        render: function () {
            var that = this;
            that.$el.html(that.actorsTemplate({
                actors: that.collection.models
            }));

            var searchTextField = document.getElementById("actor-search-text");
            this.autocomplete = new Awesomplete(searchTextField);
        },

        searchActors: function() {
            var searchText = $("#actor-search-text").val();
            var that = this;
            var oldURL =  that.collection.url;
            that.collection.url = that.collection.url + "?q=" +encodeURIComponent(searchText);
            that.collection.fetch({
                success:function(){
                    that.collection.url = oldURL;
                    that.render();
                },
                error: function (error) {
                    console.log(error.message);
                    that.collection.url = oldURL;
                }
            });
        },

        keyPressEventHandler : function(event) {
            if (event.keyCode == 13) {
                this.searchActors();
            }

            else
            {
                var searchText = $("#actor-search-text").val();
                if(searchText.length > 2 && searchText.length < 5)
                    this.updateAutoCompleteData(searchText)
            }
        },

        updateAutoCompleteData : function(searchText)
        {
            var that = this;
            app.Actors.url = "http://umovie.herokuapp.com/search/actors?q=" + searchText + "&limit=0";
            app.Actors.fetch({
                success: function () {
                    var namesArray = new Array();
                    for(var i=0; i< app.Actors.length; i++)
                    {
                        namesArray.push(app.Actors.models[i].attributes.artistName);
                    }

                    that.autocomplete.list = namesArray;
                }
            });

            app.Actors.url = "http://umovie.herokuapp.com/search/actors";
            app.Actors.reset();

        },

        get: function () {
            this.render();
        }

    });

    app.ActorsView = new ActorsView();
})(jQuery);