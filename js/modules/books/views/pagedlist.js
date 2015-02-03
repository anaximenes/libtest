define([
    'jquery',
    'underscore',
    'backbone',
    'modules/books/models/book',
    'modules/books/collections/pagedcollection',
    'modules/books/views/listitem',
    'modules/pageable/views/list'
  ],
  function($, _, Backbone, BookModel, BooksCollection, ListItemView, BaseCollectionView) {
    var CollectionView = BaseCollectionView.extend({
      model: BookModel,

      initialize: function(options) {
        options = options ? options : {}
        this.collection = options.collection ? options.collection : new BooksCollection()
        this.ItemView = ListItemView

        BaseCollectionView.prototype.initialize.apply(this, [options])
      }
    })

    return CollectionView
  }
)
