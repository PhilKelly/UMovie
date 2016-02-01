var app = app || {};

(function ($) {
    'use strict';

    var UserSearchView = Backbone.View.extend({

        el: '.user-actions',

        collection: app.Users,
        users:[],
        userId:'',
        userSearchTemplate: _.template($('#user-search-template').html()),

        events:{
            'click #user-search-btn' : 'searchUsers',
            'keyup #user-search-text' : 'keyPressEventHandler'
        },
        initialize: function () {
            _.bindAll(this, 'render');
            var that = this;
            /*that.collection.bind("change add remove", function () {
                that.render();
            });*/
        },

        render: function (userId) {
            var that = this;
            that.$el.html(that.userSearchTemplate({
                users: that.users,
                userId: userId
            }));
        },

        searchUsers: function(){
            var searchText = $("#user-search-text").val();
            if(searchText !== ""){
                var that=this;
                var oldURL =  that.collection.url;
                that.collection.url = that.collection.url + "?q=" +encodeURIComponent(searchText);
                that.collection.fetch({
                    success: function(data){
                        that.users = data.models;
                        that.render(that.userId);
                        that.collection.url = oldURL;
                    },
                    error: function (error){
                        console.log('Something went wrong!' + error.message);
                        that.collection.url = oldURL;
                    }
                });
            }

        },

        keyPressEventHandler : function(event){
            if(event.keyCode == 13){
                this.$("#user-search-btn").click();
            }
        },

        get: function (options) {
            var that = this;

            if (options.userId) {
                that.userId = options.userId;
                that.render(options.userId);
            }
        }

    });
    app.UserSearchView = new UserSearchView();

})(jQuery);
