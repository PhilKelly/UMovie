var app = app || {};

(function () {
    'use strict';

    var Actors = Backbone.Collection.extend({
        model: app.Actor,
        url: 'http://umovie.herokuapp.com/search/actors',
        parse: function(response){
            return response.results;
        }
    });

    app.Actors = new Actors();

})();
