define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/books/books-card.html',
    'text!templates/books/books-card-loading.html',
    'i18n!nls/page-books-card'
  ],
  function($, _, Backbone, Template, TemplateLoading, i18n) {
    var CardItemView = Backbone.View.extend({
      showAddToFavoritesError: false,

      events: {
        'click #favorite-button': 'toggleFavorite'
      },

      toggleFavorite: function() {
        this.listenTo(Backbone, 'book:toggleFavorite:unauth', function(model) {
          if (model.id === this.model.id) {
            // this.showAddToFavoritesError = true;
            Backbone.trigger('demandLogin');
            this.stopListening(Backbone, 'book:toggleFavorite:unauth');
          }
        }.bind(this))

        Backbone.trigger('book:toggleFavorite', this.model)
        this.model.set('isFavorite', !this.model.get('isFavorite'))
      },

      render: function() {
        if (this.model.complete()) {
          var model = _.extend(this.model.present(), i18n, {error: this.showAddToFavoritesError})
          // var model = _.extend(this.model.present(), i18n)
          this.$el.html(_.template(Template)(model))
        } else {
          this.$el.html(_.template(TemplateLoading)(i18n))
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
