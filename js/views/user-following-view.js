var app = app || {};

(function ($) {
    'use strict';

    var UserFollowingView = Backbone.View.extend({

        el: '.user-actions',
        currentUserTemplate: _.template($('#user-following-template').html()),
        user: null,
        events: {
            'click .remove-following': 'removeFollowing'
        },

        initialize: function () {
            _.bindAll(this, 'render');
            var that = this;
            if (that.user) {
                that.user.bind("change", function () {
                    that.render(that.user.id);
                });
            }
        },

        render: function (userId) {
            var that = this;
            that.user = new app.User({id: userId});
            that.user.fetch({
                success: function () {
                    that.$el.html(that.currentUserTemplate({
                        user: that.user.attributes
                    }));
                }
            });
        },

        get: function (options) {
            var that = this;

            if (options.userId) {
                that.render(options.userId);
            }

        },

        removeFollowing: function (event) {
            var that = this;
            var followingId = $(event.currentTarget).data("following-id");
            var followingModel = new app.Following({_id: followingId});
            followingModel.destroy({
                success: function () {
                    that.render(that.user.attributes.id);
                },
                error: function (error) {
                    console.log("Something wrong happened!" + error);
                }
            });
        }

    });
    app.UserFollowingView = new UserFollowingView();

})(jQuery);
