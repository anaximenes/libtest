define([
    'jquery',
    'underscore',
    'backbone',
    'modules/books/main',
    'modules/questions/main',
    'modules/reviews/main',
    'searchboxview',
    'modules/menu/main',
    'modules/user/main',
    'modules/utils/url',
    'modules/bookpage',
    'modules/questionpage',
    'modules/static/views/view',
    'modules/utils/main',
  ],
  function($, _, Backbone, BookModule, QuestionModule, ReviewModule, SearchView, Menu, User, Url, BookPage, QuestionPage, Static, Utils) {
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
        $subHeaderDom.empty()

        if (currentState.subMenu) currentState.subMenu.remove();
        if (this.currentView) this.currentView.remove();

        this.currentView = this[page](params)
        $pageDom.html(this.currentView.render().el)

        Backbone.trigger('page:rendered', {page: page, options: params})
      },


      books: function(page) {
        currentState.subMenu = Menu.get('books')
        $subHeaderDom.html(currentState.subMenu.render().el)

        currentState.books = currentState.books ? currentState.books : new BookModule.PagedCollection()
        currentState.books.currentPage = page || currentState.books.currentPage || 0

        return new BookModule.FramedListView({collection: currentState.books})
      },

      booksBase: function(url, options) {
        currentState.subMenu = Menu.get('books')
        $subHeaderDom.html(currentState.subMenu.render().el)

        var view = new BookModule.FramedListView({
          collection: new BookModule.PagedCollection([], {
            url: function() {
              return Url(url, options)
            }
          })
        })
        return view
      },

      booksSearch: function(query) {
        var view = this.booksBase('booksSearch', query)
        Backbone.trigger('menu:extend', {menu: 'books', page: 'add', path: '/books/search/' + query, title: '"' + query + '"'})
        return view
      },

      booksFavorites: function(userId) {
        var view = this.booksBase('booksFavorites', userId)
        return view
      },

      booksRecent: function(userId) {
        var view = this.booksBase('booksRecent', userId)
        return view
      },

      bookQuestions: function(book) {
        Menu.set({path: '/books/' + book.id + '/'})
        currentState.subMenu = Menu.get('book')
        $subHeaderDom.html(currentState.subMenu.render().el)

        var collection = new QuestionModule.PagedCollection([], {
          url: function() {
            return Url('bookQuestions', book.id)
          }
        })
        var questions = new QuestionModule.FramedListView({collection: collection})

        var view = new BookPage(book.id, questions)
        return view
      },

      bookReviews: function(book) {
        Menu.set({path: '/books/' + book.id + '/'})
        currentState.subMenu = Menu.get('book')
        $subHeaderDom.html(currentState.subMenu.render().el)

        var collection = new ReviewModule.PagedCollection([], {
          url: function() {
            return Url('bookReviews', book.id)
          }
        })
        var reviews = new ReviewModule.FramedListView({collection: collection})

        var view = new BookPage(book.id, reviews)
        return view
      },

      bookEdit: function(book) {
        Menu.set({path: '/books/' + book.id + '/'})
        currentState.subMenu = Menu.get('book')
        $subHeaderDom.html(currentState.subMenu.render().el)

        var model = new BookModule.Model({'id': book.id})
        var view = new BookModule.EditView({'model': model})
        model.fetch({
          success: function(model) {
            Backbone.trigger('menu:extend', {
                menu: 'header',
                page: 'add',
                path: '/books/' + book.id + '/',
                title: '"' + model.get('title') + '"'
            })
            Backbone.trigger('menu:extend', {
              menu: 'book',
              page: 'read',
              // class: 'button-read',
              title: 'read',
              path: '/reader/web/viewer.html?file=' + encodeURIComponent('http://178.63.105.73/pdf/' + btoa(model.get('sourceUrl')))
            })
            Backbone.trigger('book:fetched', model)
          }
        })
        return view
      },

      bookReport: function(book) {
        Menu.set({path: '/books/' + book.id + '/'})
        currentState.subMenu = Menu.get('book')
        $subHeaderDom.html(currentState.subMenu.render().el)

        var view = new BookModule.ReportView({id: book.id})
        return view
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
        $subHeaderDom.html(currentState.subMenu.render().el)

        var collection = new QuestionModule.PagedCollection([], { url: Url('questionsSearch', query) })
        var view = new QuestionModule.FramedListView({ collection: collection })
        return view
      },

      questionsFavorites: function(userId) {
        //nope, we don't have it
        var view = new BookModule.PagedListView({
          collection: new BookModule.PagedCollection([], {
            url: function() {
              return Url('favorites', userId)
            }
          })
        })
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
        $subHeaderDom.html(currentState.subMenu.render().el)

        var view = new User.ProfileView({ id: id })
        return view
      },

      noFavorites: function() {
        currentState.subMenu = Menu.get('books')
        $subHeaderDom.html(currentState.subMenu.render().el)

        var View = Static.extend({
          events: {
            'click .fa': 'click'
          },

          click: function() {
            this.$('.fa').toggleClass('fa-bookmark-o')
            this.$('.fa').toggleClass('fa-bookmark')
          }
        })

        var view = new View()
        require([
          'text!/templates/nofavorites.html',
          'i18n!modules/nls/nofavorites',
          'i18n!modules/nls/header'
          ], function(template, a, b) {
            _.extend(a, b)
            view.template = _.template(template)(a)
            view.render()
        })
        return view
      },

      noRecent: function() {
        currentState.subMenu = Menu.get('books')
        $subHeaderDom.html(currentState.subMenu.render().el)

        var view = new Static()
        require([
          'text!/templates/norecent.html',
          'i18n!modules/nls/norecent',
          'i18n!modules/nls/header'
          ], function(template, a, b) {
            _.extend(a, b)
            view.template = _.template(template)(a)
            view.render()
        })
        return view
      },

      test: function(status) {
        var view = new Static()
        return view
      }
    }

    return Controller
  }
);
