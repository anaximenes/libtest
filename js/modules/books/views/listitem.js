define([
    'jquery',
    'underscore',
    'backbone'
  ],
  function($, _, Backbone) {
    ListItemView = Backbone.View.extend({
      template: $('#template-books-list-entry').html(),
      // template: $('#template-books-list-entry-no-image').html(),
      templateLoading: $('#template-book-entry-loading').html(),

      events: {
        'click #favorite-button': 'toggleFavorite'
      },

      toggleFavorite: function() {
        Backbone.trigger('book:toggleFavorite', this.model)
        
        this.model.set('isFavorite', !this.model.get('isFavorite'))
        this.render()
      },

      render: function() {
        var html = undefined
        if (this.model.complete()) {
          html = _.template(this.template)(this.model.toJSON())
        } else {
          html = _.template(this.templateLoading)(this.model.toJSON())
        }
        this.$el.html(html)
        return this
      },

      initialize: function(options) {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return ListItemView
  }
)
