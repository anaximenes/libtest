define([
    'jquery',
    'underscore',
    'backbone',
    'modules/books/views/pagedlist',
    'modules/books/views/card',
    'modules/books/views/edit',
    'modules/books/views/framedlist',
    'modules/books/collections/pagedcollection',
    'modules/books/models/book'
  ],
  function($, _, Backbone, ListView, CardView, EditView, FramedListView, PagedCollection, BookModel) {
    return {
      'PagedListView':     ListView,
      'CardView':          CardView,
      'EditView':          EditView,
      'FramedListView':    FramedListView,
      'PagedCollection':   PagedCollection,
      'Model':             BookModel
    }
  }
)
