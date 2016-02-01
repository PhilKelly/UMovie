var app = app || {};

(function ($) {
    'use strict';

    var UserWatchlistView = Backbone.View.extend({

        el: '.user-actions',
        userId:'',
        collection: new app.Watchlists(),
        currentUserTemplate: _.template($('#user-watchlist-template').html()),
        events: {
            'click .delete-watchlist': 'removeWatchlist'
        },

        initialize: function () {
            _.bindAll(this, 'render');
            var that = this;
            that.collection.bind("change", function () {
                that.render( that.userId,that.collection);
            });

        },

        render: function (userId, globalWatchlists) {
            var that = this;
            var userWatchlist = [];
            globalWatchlists.forEach(function (watchlist) {
                if (watchlist.attributes.owner.id === userId) {
                    userWatchlist.push(watchlist);
                }
            });
            that.$el.html(that.currentUserTemplate({
                userId: userId,
                watchlists: userWatchlist
            }));


        },

        get: function (options) {
            var that = this;
            that.collection.fetch({
                success: function () {
                    if (options.userId) {
                        that.userId= options.userId;
                        that.render(options.userId, that.collection.models);
                    }
                }
            });
        },

        removeWatchlist: function (event) {
            var that = this;
            var watchlistID = $(event.currentTarget).data("watchlist-id");
            var watchlistModel = new app.Watchlist({id: watchlistID});
            watchlistModel.destroy({
                success: function () {
                    that.get({userId : that.userId});
                },
                error: function (error) {
                    console.log("Something wrong happened!" + error);
                }
            });
        }

    });
    app.UserWatchlistView = new UserWatchlistView();

})(jQuery);
