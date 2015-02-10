define([
    'jquery',
    'underscore',
    'backbone',
    'modules/books/views/pagedlist',
    'modules/books/views/card',
    'modules/books/views/edit',
    'modules/books/views/report',
    'modules/books/views/framedlist',
    'modules/books/views/bookpage',
    'modules/books/collections/pagedcollection',
    'modules/books/models/book',
    'modules/utils/url'
  ],
  function($, _, Backbone, ListView, CardView, EditView, ReportView, FramedListView, BookPageView, PagedCollection, BookModel, Url) {
    var saved = {}
    saved.models = {}
    saved.collections = {}

    var allView = function() {
      saved.collections.all || (saved.collections.all = new PagedCollection())
      var view = new FramedListView({ collection: saved.collections.all })
      return view
    }

    var baseView = function(url, options) {
      var view = new FramedListView({
        collection: new PagedCollection([], {
          url: function() {
            return Url(url, options)
          }
        })
      })
      return view
    }

    var searchView = function(query) {
      return baseView('booksSearch', query)
    }

    var favoritesView = function(userId) {
      return baseView('booksFavorites', userId)
    }

    var recentView = function(userId) {
      return baseView('booksRecent', userId)
    }

    var editView = function(book) {
      var model = new BookModel({ 'id': book.id })
      var view = new EditView({ 'model': model })
      model.fetch({
        success: function(model) {
          Backbone.trigger('book:fetched', model)
        }
      })
      return view
    }

    var reportView = function(book) {
      return new ReportView({ id: book.id })
    }

    var bookPage = function(bookId, bottom) {
      var model = saved.models[bookId] || (saved.models[bookId] = new BookModel({ id: bookId }))
      return new BookPageView(model, bottom)
    }


    return {
      'PagedListView':     ListView,
      'CardView':          CardView,
      'EditView':          EditView,
      'ReportView':        ReportView,
      'FramedListView':    FramedListView,
      'BookPageView':      BookPageView,
      'PagedCollection':   PagedCollection,
      'Model':             BookModel,
      'allView':           allView,
      'searchView':        searchView,
      'favoritesView':     favoritesView,
      'recentView':        recentView,
      'editView':          editView,
      'reportView':        reportView,
      'bookPage':          bookPage,
      'saved':             saved
    }
  }
)
