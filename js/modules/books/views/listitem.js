define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/books/books-list-entry.html'
  ],
  function($, _, Backbone, Template) {
    ListItemView = Backbone.View.extend({
      events: {
        'click #favorite-button': 'toggleFavorite'
      },

      toggleFavorite: function() {
        Backbone.trigger('book:toggleFavorite', this.model)
        this.model.set('isFavorite', !this.model.get('isFavorite'))
      },

      render: function() {
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(this.model.present({ short: true })))
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
