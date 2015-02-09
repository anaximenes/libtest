define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/user/signin.html',
    'i18n!modules/nls/sign'
  ],
  function($, _, Backbone, Template, i18n) {
    SignInView = Backbone.View.extend({
      events: {
        'submit': 'signin',
      },

      signin: function(event) {
        event.preventDefault()
        this.$('.signin-error').hide()
        Backbone.trigger('user:signin', {
          email: this.$el.find('#inputEmail').val(),
          password: this.$el.find('#inputPassword').val()
        })
      },

      error: function() {
        this.$('.signin-error').show()
      },

      render: function() {
        var that = this
        this.$el.html(_.template(Template)(i18n))
        return this
      },

      initialize: function() {
        this.listenTo(Backbone, 'user:signin:error', this.error)
      }
    })

    return SignInView
  }
)
