define([
    'jquery',
    'underscore',
    'backbone',
    'controller',
    'modules/user/main'
  ],
  function($, _, Backbone, Controller, User) {
    var Router = Backbone.Router.extend({
      listener: new Backbone.View(),

      requireLogin: function(action) {
        action || (action = {})
        var that = this
        action.error || (action.error = function() { that.navigate('/signin/', {trigger: true}) })

        this.user.checkState(action)
      },

      ifLogged: function (callback) {
        this.requireLogin({success: callback, error: function() {}})
      },

      routes: {
        'books(/p:page)(/)':           'books',
        'books/search/:query(/)':      'booksSearch',
        'books/favorites(/)':          'booksFavorites',
        'books/recent(/)':             'booksRecent',
        'books/:id(/)':                'book',
        'books/:id/questions(/)':      'bookQuestions',
        'books/:id/reviews(/)':        'bookReviews',
        'books/:id/edit(/)':           'bookEdit',
        'books/:id/report(/)':         'bookReport',
        'questions(p:page)(/)':        'questions',
        'questions/search/:query(/)':  'questionsSearch',
        'questions/favorites(/)':      'questionsFavorites',
        'questions/:id(/)':            'question',
        'signin(/)':                   'signin',
        'signup(/)':                   'signup',
        'signout(/)':                  'signout',
        // 'user(/)':                     'userPage',
        'user/answers(/)':             'userAnswers',
        'user/questions(/)':           'userQuestions',
        'test(/)':                     'test',
        '(/)':                         'root',

        'book/:title/:id(/)':          'bookBackCompatability',
        '!/book/:title/:id(/)':          'bookBackCompatability'
      },

      root: function() {
        this.navigate('/books/', true)
      },

      books: function(page) {
        Controller.view('books', page)
        var that = this
      },

      booksSearch: function(query) {
        Controller.view('booksSearch', query)
      },

      bookInit: function(id) {
        var user = this.user
        this.ifLogged(function() {
          if (user.get('state') === -1) {
            Backbone.trigger('menu:extend', {
              menu: 'book', page: 'ed it', title: 'edit', path: '/books/' + id + '/edit/'
            })
          }
        })
      },

      book: function(id) {
        Controller.view('bookReviews', {'id': id})
        this.bookInit(id)
      },

      bookBackCompatability: function(title, id) {
        this.navigate('/books/' + id + '/', false)
        Controller.view('bookReviews', { 'id': id })
        this.bookInit(id)
      },

      bookQuestions: function(id) {
        Controller.view('bookQuestions', {'id': id})
        this.bookInit(id)
      },

      bookReviews: function(id) {
        Controller.view('bookReviews', {'id': id})
        this.bookInit(id)
      },

      bookReport: function(id) {
        Controller.view('bookReport', {'id': id})
        this.bookInit(id)
      },

      bookEdit: function(id) {
        var that = this
        var user = this.user
        this.requireLogin({
          success: function() {
            if (user.get('state') === -1) {
              Controller.view('bookEdit', {'id': id})
              Backbone.trigger('menu:extend', {
                menu: 'book', page: 'edit', title: 'edit', path: '/books/' + id + '/edit/'
              })
            } else {
              // #bad request
              that.navigate('/', true)
            }
          }
        })
      },

      questions: function(page) {
        Controller.view('questions', page)
      },

      questionsSearch: function(query) {
        Controller.view('questionsSearch', query)
      },

      question: function(id) {
        Controller.view('questionAnswers', {'id': id})
      },

      signin: function() {
        if (this.user.isLogged()) {
          Backbone.history.history.back()
        }
        Controller.view('signin')
      },

      signup: function() {
        if (this.user.isLogged()) {
          Backbone.history.history.back()
        }
        Controller.view('signup')
      },

      signout: function() {
        this.user.logOut()
      },

      userPage: function() {
        var that = this
        this.requireLogin({
          success: function() {
            Controller.view('user', that.user.id)
          }
        })
      },

      userAnswers: function() {
        var that = this
        this.requireLogin({
          success: function() {
            Controller.view('userAnswers', that.user.id)
          }
        })
      },

      userQuestions: function() {
        var that = this
        this.requireLogin({
          success: function() {
            Controller.view('userQuestions', that.user.id)
          }
        })
      },

      booksFavorites: function() {
        var that = this
        this.requireLogin({
          success: function() {
            Controller.view('booksFavorites', that.user.id)
          },
          error: function() {
            Controller.view('noFavorites')
          }
        })
      },

      booksRecent: function() {
        var that = this
        this.requireLogin({
          success: function() {
            Controller.view('booksRecent', that.user.id)
          },
          error: function() {
            Controller.view('noRecent')
          }
        })
      },

      questionsFavorites: function() {
        Controller.view('questionsFavorites', this.user.id)
      },

      test: function() {
        Controller.view('test')
      },

      initialize: function() {
        var that = this
        Controller.init()

        var signed = function(id) {
          console.log('sign in ', id)
          if (Backbone.history.fragment.slice(0, 4) === 'sign') {
            Backbone.history.history.back()
          }
        }
        var signOut = function() {
          Backbone.history.history.back()
        }
        var search = function(query) {
          var url = Backbone.history.fragment
          if (url.indexOf('questions') === 0) {
            that.navigate('/questions/search/' + query, true)
          } else {
            that.navigate('/books/search/' + query, true)
          }
        }
        var demandLogin = function() {
          this.requireLogin();
        }.bind(this)

        var eventHandler = {
          'user:signout':       signOut,
          'user:signed':        signed,
          'search':             search,
          'demandLogin':        demandLogin
        }

        for (var event in eventHandler) {
          that.listener.listenTo(Backbone, event, eventHandler[event])
        }
      }
    })

    return Router
  }
);
