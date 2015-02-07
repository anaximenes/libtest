define([
    'jquery',
    'underscore',
    'backbone',
  ],
  function($, _, Backbone) {
    var MenuHandler = Backbone.View.extend({
      // menus to be activated on each page:
      pageMap: {
        'books':            {'header': 'books', 'books': 'all'},
        'booksRecent':      {'header': 'books', 'books': 'recent'},
        'noRecent':         {'header': 'books', 'books': 'recent'},
        'booksFavorites':   {'header': 'books', 'books': 'favorites'},
        'noFavorites':      {'header': 'books', 'books': 'favorites'},
        'booksSearch':      {'header': 'books', 'books': 'add'},

        'book':             {'header': 'add', 'book': 'description'},
        'bookEdit':         {'header': 'add', 'book': 'edit'},
        'bookReviews':      {'header': 'add', 'book': 'description', 'sub': 'bookReviews'},
        'bookQuestions':    {'header': 'add', 'book': 'description', 'sub': 'bookQuestions'},
        'bookReport':       {'header': 'add', 'book': 'report'},

        'questions':        {'header': 'questions'},
        'questionsSearch':  {'header': 'questions', 'questions': 'search'},

        'question':         {'header': 'question', 'sub': 'questionAnswers'},
        'questionAnswers':  {'header': 'question', 'sub': 'questionAnswers'},

        'user':             {'header': 'profile', 'user': 'info'}
      },

      handle: function(options) {
        options || (options = {})

        if (options.page) {
          if (['book', 'bookEdit', 'bookQuestions', 'bookReviews'].indexOf(options.page) != -1) {
            this.bookId = options.options.id
          }
          if (['question', 'questionAnswers'].indexOf(options.page) != -1) {
            this.questionId = options.options.id
          }
        }

        this.page = options.page || this.page

        var menus = this.pageMap[this.page]
        for (var i in menus) {
          Backbone.trigger('menu:activate', {menu: i, page: menus[i]})
        }
      },

      updateBookMenuItem: function(model) {
        if (this.bookId == model.id) {
          Backbone.trigger('menu:extend', {
              menu: 'header',
              page: 'add',
              path: '/books/' + this.bookId + '/',
              title: '"' + model.get('title') + '"'
          })
          Backbone.trigger('menu:extend', {
            menu: 'book',
            page: 'read',
            class: 'button-read',
            title: 'read',
            path: '/reader/web/viewer.html?file=' + encodeURIComponent('http://178.63.105.73/pdf/' + btoa(model.get('sourceUrl')))
          })
        }
      },

      updateQuestionMenuItem: function(model) {
        if (this.questionId == model.id) {
          Backbone.trigger('menu:extend', {
              page: 'question',
              title: '"' + model.get('title') + '"',
              path: '/questions/' + this.questionId + '/',
              menu: 'header'
          })
        }
      },

      initialize: function() {
        this.listenTo(Backbone, 'page:rendered', this.handle)
        this.listenTo(Backbone, 'menu:refresh', this.handle)
        this.listenTo(Backbone, 'book:fetched', this.updateBookMenuItem)
        this.listenTo(Backbone, 'question:fetched', this.updateQuestionMenuItem)
      }
    })

    return MenuHandler
  }
)
