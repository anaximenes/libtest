define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/questions/questions-card.html'
  ],
  function($, _, Backbone, Template) {
    var CardItemView = Backbone.View.extend({
      render: function() {
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(this.model.toJSON()))
        }
        return this
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return CardItemView
  }
)