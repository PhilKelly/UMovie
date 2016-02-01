var app = app || {};

(function ($) {
    'use strict';
    var NavBarView = Backbone.View.extend({

        el: '.navbar',
        navBarTemplate: _.template($('#navbar-template').html()),

        events: {
            'click #logOut': 'logOutUser',
            'click #global-search-btn': 'globalSearchOfDooooom',
            'keyup #global-search-text': 'keyPressEventHandler'
        },

        render: function () {
            var that = this;
            var userName = $.cookie('userName');
            var user = new app.User({id: $.cookie('userId')});
            user.fetch({
                success: function () {
                    that.$el.html(that.navBarTemplate({
                        currentUserName: userName,
                        emailHash: md5(user.get('email'))
                    }));
                }
            });
        },

        logOutUser: function () {
            $.removeCookie('userToken');
            $.removeCookie('userName');
            $.removeCookie('userId');
            $.ajax({
                url: 'http://umovie.herokuapp.com/logout',
                type: 'GET'
            }).done(function (){
                window.location.href = './home.html';
            });
        },

        keyPressEventHandler : function(event) {
            if (event.keyCode == 13) {
                this.globalSearchOfDooooom();
            }
        },
        globalSearchOfDooooom: function () {
            var searchText = $("#global-search-text").val();
            app.GlobalSearchView.render(searchText);
        }
    });

    app.NavBarView = new NavBarView();

})(jQuery);
