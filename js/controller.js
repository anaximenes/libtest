define([
    'jquery',
    'underscore',
    'backbone',
    'modules/books/main',
    'modules/questions/main',
    'modules/reviews/main',
    'modules/answers/main',
    'searchboxview',
    'modules/menu/main',
    'modules/user/main',
    'modules/utils/url',
    'modules/questionpage',
    'modules/static/views/view',
    'modules/nodata/main',
    'modules/utils/main',
  ],
  function($, _, Backbone, BookModule, QuestionModule, ReviewModule, AnswerModule, SearchView, Menu, User, Url, QuestionPage, Static, NoData, Utils) {
    var currentState = {}

    var $headerDom = $('#header')
    var $subHeaderDom = $('#sub-header')
    var $pageDom = $('#page')


    var Controller = {
      currentView: undefined,

      init: function() {
        new SearchView()
        $headerDom.html(Menu.get('header').render().el)
        new Utils.MenuHandler()
        new Utils.PageTitleHandler()
        new Utils.OpenGraphHandler()
      },

      view: function(page, params) {
        Backbone.trigger('page:render', { page: page, options: params })

        $subHeaderDom.empty()

        if (currentState.subMenu) currentState.subMenu.remove();
        currentState.subMenu = undefined
        if (this.currentView) this.currentView.remove();

        this.currentView = this[page](params)
        $pageDom.html(this.currentView.render().el)
        $subHeaderDom.html(currentState.subMenu ? currentState.subMenu.render().el : '')

        Backbone.trigger('page:rendered', {page: page, options: params})
      },


      books: function(page) {
        currentState.subMenu = Menu.get('books')

        return BookModule.getAllView()
      },

      booksSearch: function(query) {
        currentState.subMenu = Menu.get('books')
        Backbone.trigger('menu:extend', {menu: 'books', page: 'add', path: '/books/search/' + query, title: '"' + query + '"'})

        return BookModule.getSearchView(query)
      },

      booksFavorites: function(userId) {
        currentState.subMenu = Menu.get('books')

        return BookModule.getFavoritesView(userId)
      },

      booksRecent: function(userId) {
        currentState.subMenu = Menu.get('books')

        return BookModule.getRecentView(userId)
      },

      bookQuestions: function(book) {
        currentState.subMenu = Menu.get('book')

        var collection = new QuestionModule.PagedCollection([], {
          url: function() {
            return Url('bookQuestions', book.id)
          }
        })
        var questions = new QuestionModule.FramedListView({collection: collection})

        var view = BookModule.getBookPageView(book.id, questions)
        return view
      },

      bookReviews: function(book) {
        currentState.subMenu = Menu.get('book')

        var collection = new ReviewModule.PagedCollection([], {
          url: function() {
            return Url('bookReviews', book.id)
          }
        })
        var reviews = new ReviewModule.FramedListView({collection: collection})

        var view = BookModule.getBookPageView(book.id, reviews)
        return view
      },

      bookEdit: function(book) {
        currentState.subMenu = Menu.get('book')

        return BookModule.getEditView(book)
      },

      bookReport: function(book) {
        currentState.subMenu = Menu.get('book')

        return BookModule.getReportView(book)
      },


      questions: function(page) {
        currentState.questions = currentState.questions ? currentState.questions : new QuestionModule.PagedCollection()
        currentState.questions.currentPage = page

        return new QuestionModule.FramedListView({collection: currentState.questions})
      },

      questionsSearch: function(query) {
        currentState.subMenu = Menu.add('questions', [
          {page: 'all', title: 'all', path: '/questions/'},
          {page: 'search', path: '/books/search/' + query, title: '"' + query + '"'}
        ])

        var collection = new QuestionModule.PagedCollection([], { url: Url('questionsSearch', query) })
        var view = new QuestionModule.FramedListView({ collection: collection })
        return view
      },

      questionAnswers: function(question) {
        var view = new QuestionPage(question.id)
        return view
      },


      signin: function() {
        var view = new User.signinView()
        return view
      },

      signup: function() {
        var view = new User.signupView()
        return view
      },

      user: function(id) {
        Backbone.trigger('menu:extend', {
          menu: 'header',
          page: 'profile',
          title: 'Profile',
          path: '/user/',
          toRight: true
        })
        currentState.subMenu = Menu.get('user')

        var view = new User.ProfileView({ id: id })
        return view
      },

      userAnswers: function(id) {
        Backbone.trigger('menu:extend', {
          menu: 'header',
          page: 'profile',
          title: 'Profile',
          path: '/user/',
          toRight: true
        })
        currentState.subMenu = Menu.get('user')

        var collection = new AnswerModule.PagedCollection([], { url: Url('userAnswers', id) })
        var view = new AnswerModule.FramedListView({ collection: collection })
        return view
      },

      noFavorites: function() {
        currentState.subMenu = Menu.get('books')

        return new NoData.FavoritesView()
      },

      noRecent: function() {
        currentState.subMenu = Menu.get('books')

        return new NoData.RecentView()
      },

      test: function(status) {
        var view = new (Static.extend({
          initialize: function() {
          }
        }))()

        require(['text!/templates/test.html'], function(template) {
          view.template = _.template(template)
          view.render()
        })
        return view
      }
    }

    return Controller
  }
);
