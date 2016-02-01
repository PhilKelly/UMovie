var app = app || {};

(function ($) {
    'use strict';

    var UserProfileView = Backbone.View.extend({

        el: '.user-profile',
        currentUserTemplate: _.template($('#user-profile-template').html()),
        user: null,
        activeUser: null,
        followingId:'',
        events: {
            'click #follow-user-btn': 'followUser',
            'click #remove-following-btn': 'removeFollowing'
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
                    var isFollowing = false;
                    that.activeUser.attributes.following.forEach(function (follow){
                       if  (follow.email === that.user.attributes.email){
                           isFollowing = true;
                           that.followingId = follow.id;
                       }
                    });
                    that.$el.html(that.currentUserTemplate({
                        user: that.user.attributes,
                        isFollowing: isFollowing,
                        emailHash: md5(that.user.get('email'))
                    }));
                }
            });
        },

        get: function (options) {
            var that = this;
            that.activeUser = new app.User({id: $.cookie('userId')});
            if (options.userId) {
                that.activeUser.fetch({
                    success: function () {
                        that.render(options.userId);
                    }
                });
            }

        },

        removeFollowing: function () {
            var that = this;
            var followingModel = new app.Following({_id: that.followingId});
            followingModel.destroy({
                success: function () {
                    that.get({userId:that.user.attributes.id});
                },
                error: function (error) {
                    console.log("Something wrong happened!" + error);
                }
            });
        },

        followUser: function () {
            var that = this;
            var followingModel = new app.Following({id: that.user.attributes.id});
            followingModel.save().complete(function () {
                that.get({userId:that.user.attributes.id});
            });
        }

    });
    app.UserProfileView = new UserProfileView();

})(jQuery);
