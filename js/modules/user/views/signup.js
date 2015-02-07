define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/user/signup.html',
    'i18n!modules/nls/sign'
  ],
  function($, _, Backbone, Template, i18n) {
    SignUpView = Backbone.View.extend({
      events: {
        'submit': 'signup',
      },

      signup: function(event) {
        event.preventDefault()
        var password = this.$el.find('#inputPassword').val()
        var password2 = this.$el.find('#inputPasswordRepeat').val()
        if (password === password2) {
          Backbone.trigger('user:signup', {
            email: this.$el.find('#inputEmail').val(),
            password: this.$el.find('#inputPassword').val(),
            verifyPassword: this.$el.find('#inputPassword').val(),
            name: this.$el.find('#inputName').val()
          })
        }
      },

      render: function() {
        var that = this
        this.$el.html(_.template(Template)(i18n))
        return this
      },

      initialize: function() {
      }
    })

    return SignUpView
  }
)
