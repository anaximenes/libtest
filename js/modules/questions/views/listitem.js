define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/questions/questions-list-entry.html'
  ],
  function($, _, Backbone, Template) {
    ListItemView = Backbone.View.extend({
      render: function() {
        this.$el.html(_.template(Template)(this.model.toJSON()))
        return this
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return ListItemView
  }
)
