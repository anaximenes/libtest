define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/template'
  ],
  function($, _, Backbone, TemplateManager) {
    var CardItemView = Backbone.View.extend({
      // template: $('#template-book-card').html(),
      // templateLoading: $('#template-book-entry-loading').html(),

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
          console.log(this.model)
          var that = this
          TemplateManager.get('books-card', function(template) {
            console.log(that.model.present())
            that.$el.html(template(that.model.present()))
          })
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