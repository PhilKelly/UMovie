var app = app || {};

(function ($) {
    'use strict';

    var Register = function (name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    };

    var RegisterView = Backbone.View.extend({

        el: '.register',
        registerTemplate: _.template($('#register-template').html()),
        notificationsElement: '.registerNotifications',
        notificationsTemplate: _.template($('#notification-template').html()),
        successRegisterTemplate: _.template($('#register-success-template').html()),
        errors: [],

        events: {
            'click #register': 'register'
        },

        render: function () {
            this.$el.html(this.registerTemplate);
        },

        renderNotifications: function () {
            var that = this;
            var notifications = $(this.notificationsElement);
            notifications.hide();
            notifications.html(this.notificationsTemplate({
                errors: that.errors
            }));

            if (this.errors.length > 0) {
                notifications.fadeIn();
            } else {
                notifications.fadeOut();
            }
        },

        renderSuccess: function () {
            this.$el.html(this.successRegisterTemplate);
        },

        register: function () {
            var that = this;
            var name = $('#registerName').val();
            var email = $('#registerEmail').val();
            var password = $('#registerPassword').val();
            var passwordConfirmation = $('#registerConfirmPassword').val();

            if (this.formIsValid(name, email, password, passwordConfirmation)) {
                $.ajax({
                    url: 'http://umovie.herokuapp.com/signup',
                    type: 'POST',
                    data: new Register(name, email, password),
                    contentType: 'application/x-www-form-urlencoded'
                }).done(function (){
                    that.renderSuccess();
                }).fail(function (){
                    that.errors.push('A user is already registered with this email. Please try to log in or use another email address.');
                    that.renderNotifications();
                });
            }else{
                that.renderNotifications();
            }
        },

        formIsValid: function (name, email, password, passwordConfirmation) {
            var that = this;
            that.errors = [];
            var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (name === "" || email === "" || password === "" || passwordConfirmation === "") {
                that.errors.push('Please fill every field.');
                return false;
            } else if (!emailRegex.test(email)) {
                that.errors.push('Please enter a valid email');
                return false;
            } else if (password !== passwordConfirmation) {
                that.errors.push('Password and password confirmation has to be the same.');
                return false;
            } else {
                return true;
            }
        }


    });

    app.RegisterView = new RegisterView();

})(jQuery);
