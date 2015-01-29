define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/template',
    'modules/user/models/auth'
  ],
  function($, _, Backbone, TemplateManager, Model) {
    SignInView = Backbone.View.extend({
      events: {
        'submit': 'signin'
      },

      signin: function() {
        event.preventDefault()
        Backbone.trigger('user:signin', {
          email: this.$el.find('#inputEmail').val(),
          password: this.$el.find('#inputPassword').val()
        })
      },

      render: function() {
        var that = this
        TemplateManager.get('signin', function(template) {
          that.$el.html(template())
        })
        return this
      },

      initialize: function() {
      }
    })

    return SignInView
  }
)
