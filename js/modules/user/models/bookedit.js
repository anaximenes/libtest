define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/books/models/book',
    // 'modules/user/models/auth',
  ],
  function($, _, Backbone, Url, BookModel) {
    var BookEdit = Backbone.Model.extend({
      controller: function(options) {
        if (options.page === 'bookEdit') {
          this.set('bookId', options.options.id)
        } else {
          this.set('bookId', undefined)
        }
        console.log(this.get('bookId'))
      },

      save: function(options) {
        // options || (options = {})
        var model = new BookModel({
          url: function() {
            return Url('book', this.get('bookId'))
          },
          id: this.get('bookId')
        })
        model.set('description', options.description)
        model.fetch({
          success: function(model) {
            model.save(options)
          },
          error: function(model, response) {
            Backbone.trigger('book:edit:error')
          }
        })
      },

      initialize: function() {
        this.listenTo(Backbone, 'page:rendered', this.controller)
        this.listenTo(Backbone, 'book:edit:save', this.save)
      }
    })

    return BookEdit
  }
)
