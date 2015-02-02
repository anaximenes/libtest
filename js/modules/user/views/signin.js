define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/user/signin.html',
  ],
  function($, _, Backbone, template) {
    SignInView = Backbone.View.extend({
      events: {
        'submit': 'signin',
      },

      signin: function(event) {
        event.preventDefault()
        Backbone.trigger('user:signin', {
          email: this.$el.find('#inputEmail').val(),
          password: this.$el.find('#inputPassword').val()
        })
      },

      signup: function(event) {
        event.preventDefault()
        Backbone.trigger('user:signup', {
          email: this.$el.find('#inputEmail').val(),
          password: this.$el.find('#inputPassword').val()
        })
      },

      render: function() {
        var that = this
        this.$el.html(_.template(template)())
        return this
      },

      initialize: function() {
      }
    })

    return SignInView
  }
)
