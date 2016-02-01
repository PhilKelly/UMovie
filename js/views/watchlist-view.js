var app = app || {};

(function ($) {
    'use strict';

    var WatchlistView = Backbone.View.extend({

        el: '.watchlist',

        collection: new app.Watchlists(),
        watchlistTemplate: _.template($('#watchlist-template').html()),
        userWatchlists : [],
        events: {
            'click #create-watchlist': 'addWatchlist',
            'keypress .edit-watchlist-name': 'updateWatchlistOnEnter',
            'click .delete-watchlist': 'removeWatchlist'
        },

        initialize: function () {
            _.bindAll(this, 'render');
            var that = this;
            this.input = "";
            that.collection.bind("change add remove", function () {
                that.render();
            });
        },

        render: function () {
            var that = this;
            that.userWatchlists = [];
            that.collection.models.forEach(function (watchlist) {
                if (watchlist.attributes.owner.id === $.cookie('userId')) {
                    that.userWatchlists.push(watchlist);
                }
            });
            that.$el.html(that.watchlistTemplate({
                watchlists:that.userWatchlists
            }));
        },

        get: function () {
            var that = this;
            that.collection.fetch({
                success: function () {
                    that.render();
                }
            });
        },

        addWatchlist: function () {
            var that = this;
            var watchlistName = $('#watchlist-create-name').val().trim();
            if (watchlistName === '') {
                alert("Please enter a name for your new Watchlist")
            }
            else {
                var exist = false;
                that.userWatchlists.forEach(function(watchlist){
                    if(watchlist.attributes.name === watchlistName){
                        exist = true;
                        alert("This name is already taken for a watchlist")
                    }
                });
                if (!exist){
                    var watchlistModel = new app.Watchlist({name: watchlistName});
                    watchlistModel.save().complete(function () {
                        that.get();
                    });
                }

            }
        },

        removeWatchlist: function (event) {
            var that = this;
            var watchlistID = $(event.currentTarget).data("watchlist-id");
            var watchlistModel = new app.Watchlist({id: watchlistID});
            watchlistModel.destroy({
                success: function (model, response) {
                    that.get();
                },
                error: function (error) {
                    console.log("Something wrong happened!" + error);
                }
            });
        },

        updateWatchlistOnEnter: function (event) {
            var that = this;
            $('.edit-watchlist-name').bind('input', function () {
                that.input = $(this).val()
            });
            if (event.keyCode == 13) {
                if (that.input.trim() === '') {
                    alert("Please enter a name for the updated Watchlist")
                }
                else {
                    var exist = false;
                    that.collection.models.forEach(function(watchlist){
                        if(watchlist.attributes.name === that.input){
                            exist = true
                            alert("This name is already taken for a watchlist")
                        }
                    });
                    if (!exist){
                        var watchlistID = $(event.currentTarget).data("watchlist-id");
                        var watchlistModel = that.collection.get(watchlistID);
                        watchlistModel.set({name: that.input});
                        watchlistModel.save().complete(function () {
                            that.get();
                        });
                    }
                }
            }
        }
    });

    app.WatchlistView = new WatchlistView();
})(jQuery);