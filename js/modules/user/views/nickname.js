define([
    'jquery',
    'underscore',
    'backbone',
    'modules/user/models/user',
    'text!/templates/user/nickname.html'
  ],
  function($, _, Backbone, Model, template) {
    SignInView = Backbone.View.extend({
      el: $('#page-nickname'),

      render: function() {
        html = _.template(template)(this.model.toJSON())
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
