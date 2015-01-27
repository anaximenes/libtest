define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/pageable/collections/collection',
    'modules/books/models/book'
  ],
  function($, _, Backbone, Url, BasePagedCollection, BookModel) {
    var PagedCollection = BasePagedCollection.extend({
      model: BookModel,
      url: function() {
        return Url('books')
      },

      initialize: function(models, options) {
        BasePagedCollection.prototype.initialize.apply(this, [models, options])
        options = options || {}
        if (options.url) {
          this.url = options.url  
        }
      }
    })

    return PagedCollection
  }
)
