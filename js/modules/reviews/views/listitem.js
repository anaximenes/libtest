define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/reviews/reviews-list-entry.html'
  ],
  function($, _, Backbone, Template) {
    ListItemView = Backbone.View.extend({
      render: function() {
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(this.model.present()))
        }
        return this
      },

      initialize: function(options) {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return ListItemView
  }
)
