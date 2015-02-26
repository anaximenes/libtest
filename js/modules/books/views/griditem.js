define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/books/books-grid-entry.html'
  ],
  function($, _, Backbone, Template) {
    ListItemView = Backbone.View.extend({
      showAddToFavoritesError: false,

      events: {
        'click #favorite-button': 'toggleFavorite'
      },

      toggleFavorite: function() {
        this.listenTo(Backbone, 'book:toggleFavorite:unauth', function(model) {
          if (model.id === this.model.id) {
            this.showAddToFavoritesError = true;
            // this.$('.error-favorites').show();
            this.stopListening(Backbone, 'book:toggleFavorite:unauth');
          }
        }.bind(this))

        Backbone.trigger('book:toggleFavorite', this.model)
        this.model.set('isFavorite', !this.model.get('isFavorite'))
      },

      render: function() {
        if (this.model.complete()) {
          var model = _.extend(this.model.present({ short: true }), {error: this.showAddToFavoritesError})
          this.$el.html(_.template(Template)(model))
          // this.$el.html(_.template(Template)(this.model.present({ short: true })))
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
