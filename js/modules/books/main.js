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
    'modules/utils/url',
    'modules/books/views/gridview'
  ],
  function($, _, Backbone, ListView, CardView, EditView, ReportView, FramedListView, BookPageView, PagedCollection, BookModel, Url, GridView) {
    var saved = {}
    saved.models = {}
    saved.collections = {}

    var getAllView = function() {
      saved.collections.all || (saved.collections.all = new PagedCollection())
      var view = new FramedListView({ collection: saved.collections.all })
      return view
    }

    var getAllGridView = function() {
      return new GridView()
    }

    var getBaseView = function(url, options) {
      var view = new FramedListView({
        collection: new PagedCollection([], {
          url: function() {
            return Url(url, options)
          }
        })
      })
      return view
    }

    var getSearchView = function(query) {
      return getBaseView('booksSearch', query)
    }

    var getFavoritesView = function(userId) {
      return getBaseView('booksFavorites', userId)
    }

    var getRecentView = function(userId) {
      return getBaseView('booksRecent', userId)
    }

    var getEditView = function(book) {
      var model = new BookModel({ 'id': book.id })
      var view = new EditView({ 'model': model })
      model.fetch({
        success: function(model) {
          Backbone.trigger('book:fetched', model)
        }
      })
      return view
    }

    var getReportView = function(book) {
      var model = new BookModel({ id: book.id })
      model.fetch({
        success: function(model) {
          Backbone.trigger('book:fetched', model)
        }
      })
      return new ReportView({ id: book.id })
    }

    var getBookPageView = function(bookId, bottom) {
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
      'getAllView':        getAllView,
      'getAllGridView':    getAllGridView,
      'getSearchView':     getSearchView,
      'getFavoritesView':  getFavoritesView,
      'getRecentView':     getRecentView,
      'getEditView':       getEditView,
      'getReportView':     getReportView,
      'getBookPageView':   getBookPageView,
      'saved':             saved
    }
  }
)
