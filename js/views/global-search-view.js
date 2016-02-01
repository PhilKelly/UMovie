var app = app || {};

(function ($) {
    'use strict';
    var GlobalSearchView = Backbone.View.extend({
        activeUser:null,

        actors: app.Actors,
        movies: app.Movies,
        users: app.Users,
        shows: app.TvShows,

        events: {
            'click .follow-user-btn': 'followUser',
            'click .remove-following-btn': 'removeFollowing'
        },

        el: '.global-search',
        globalSearchTemplate: _.template($('#global-search-template').html()),

        render: function (aWord) {
            app.clearViews();
            var that = this;
            that.activeUser = new app.User({id: $.cookie('userId')});

            var oldActorsURL =  that.actors.url;
            that.actors.url = that.actors.url + "?q=" +encodeURIComponent(aWord);

            var oldMoviesURL =  that.movies.url;
            that.movies.url = that.movies.url + "?q=" +encodeURIComponent(aWord);

            var oldUsersURL =  that.users.url;
            that.users.url = that.users.url + "?q=" +encodeURIComponent(aWord);

            var oldshowsURL =  that.shows.url;
            that.shows.url = that.shows.url + "?q=" +encodeURIComponent(aWord);

            var complete = _.invoke([this.actors, this.movies, this.users, this.shows, this.activeUser], 'fetch');
            $.when.apply($, complete).done(function() {
                that.users.models.forEach(function (theGuy){
                    that.activeUser.attributes.following.some(function (followed){
                        if  (followed.email === theGuy.attributes.email){
                            theGuy.isFollowing = true;
                            return true;
                        }else{
                            theGuy.isFollowing = false;
                        }
                    });

                });
                that.internalRender();
                that.actors.url = oldActorsURL;
                that.movies.url = oldMoviesURL;
                that.users.url = oldUsersURL;
                that.shows.url = oldshowsURL;
            });

        },

        internalRender: function(){
            var that = this;

            that.$el.html(that.globalSearchTemplate({
                actors: that.actors.models,
                movies: that.movies.models,
                users: that.users.models,
                tvshows: that.shows.models
            }));
        },

        removeFollowing: function (ev) {
            var userId = $(ev.currentTarget).data('user-id');
            var that = this;
            var followingModel = new app.Following({_id: userId});
            followingModel.destroy({
                success: function () {
                    that.users.models.forEach(function (theGuy){
                         if(theGuy.attributes.id === userId){
                            theGuy.isFollowing = !theGuy.isFollowing;
                         }
                    });
                    that.internalRender();
                },
                error: function (error) {
                    console.log("Something wrong happened!" + error);
                }
            });
        },

        followUser: function (ev) {
            var userId = $(ev.currentTarget).data('user-id');
            var that = this;
            var followingModel = new app.Following({id: userId});
            followingModel.save().complete(function () {
                that.users.models.forEach(function (theGuy){
                    if(theGuy.attributes.id === userId){
                        theGuy.isFollowing = !theGuy.isFollowing;
                    }
                });
                that.internalRender();
            });
        }


    });

    app.GlobalSearchView = new GlobalSearchView();

})(jQuery);
