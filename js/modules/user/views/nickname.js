define([
    'jquery',
    'underscore',
    'backbone',
    'modules/user/models/user'
  ],
  function($, _, Backbone, Model) {
    SignInView = Backbone.View.extend({
      el: $('#page-nickname'),

      render: function() {
        html = '<a href="#!/user/">' + this.model.get('nickname') + '</a>'
        this.$el.html(html)
        return this
      },

      initialize: function() {
        this.render()

        this.listenTo(this.model, 'change', this.render)
      }
    })

    return SignInView
  }
)
