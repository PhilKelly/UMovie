var app = app || {};

(function () {
    'use strict';

    //HANDLE GLOBAL AJAX ERRORS
    $(document).ajaxError(function(event, request, settings) {
        if(request.status == 401){
            window.location.href = "./home.html";
        }
    });

    var originalSync = Backbone.sync;
    Backbone.sync = function (method, model, options){
        var token = $.cookie('userToken');
        if(token){
            options.headers = options.headers || {};
            _.extend(options.headers, {'Authorization' : token});
            return originalSync.call(model, method, model, options);
        }else{
            window.location.href = "./home.html";
        }
    }

})();