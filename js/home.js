var app = app || {};

(function () {
    'use strict';

    var HomeRouter = Backbone.Router.extend({
        routes: {
            '': 'home'
        }
    });

    app.HomeRouter = new HomeRouter();

    app.HomeRouter.on('route:home', function () {
        app.LoginView.render();
        app.RegisterView.render();
    });


    Backbone.history.start();
})();