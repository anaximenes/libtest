define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/reviews/reviews-list-entry.html'
    // ^ fix
  ],
  function($, _, Backbone, Template) {
    var CardItemView = Backbone.View.extend({
      render: function() {
        var that = this
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(that.model.present()))
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
