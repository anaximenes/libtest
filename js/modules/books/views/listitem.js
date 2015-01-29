define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/template'
  ],
  function($, _, Backbone, TM) {
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
        var that = this
        TM.get('books-list-entry', function(template) {
          html = template(that.model.present())
          that.$el.html(html)
        })
        // if (this.model.complete()) {
        //   html = template(this.model.present())
        //   // html = _.template(this.template)(this.model.toJSON())
        // } else {
        //   html = _.template(this.templateLoading)(this.model.toJSON())
        // }
        // this.$el.html(html)
        return this
      },

      render2: function() {
        var html = undefined
        
        if (this.model.complete()) {
          html = _.template(this.template)(this.model.present())
          // html = _.template(this.template)(this.model.toJSON())
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
