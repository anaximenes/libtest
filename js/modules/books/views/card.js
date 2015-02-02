define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/books/books-card.html',
    'i18n!modules/nls/page-books-card'
  ],
  function($, _, Backbone, template, i18n) {
    var CardItemView = Backbone.View.extend({
      events: {
        'click #favorite-button': 'toggleFavorite'
      },

      toggleFavorite: function() {
        Backbone.trigger('book:toggleFavorite', this.model)

        this.model.set('isFavorite', !this.model.get('isFavorite'))
        this.render()
      },

      render: function() {
        if (this.model.complete()) {
          var model = _.extend(this.model.present(), i18n)
          this.$el.html(_.template(template)(model))
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