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
        if (this.user.isLogged()) {
          action.success()
        } else {
          action.error === undefined ?
            this.navigate('/signin', {trigger: true, replace: true})
            :
            action.error()
        }
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
        'questions(p:page)(/)':        'questions',
        'questions/search/:query(/)':  'questionsSearch',
        'questions/favorites(/)':      'questionsFavorites',
        'questions/:id(/)':            'question',
        'signin(/)':                   'signin',
        'signup(/)':                   'signup',
        'signout(/)':                  'signout',
        'user(/)':                     'userPage',
        'test(/)':                     'test',
        '*path':                         'root'
      },

      root: function() {
        this.navigate('/books', true)
      },

      books: function(page) {
        Controller.view('books', page)
      },

      booksSearch: function(page) {
        Controller.view('booksSearch', page)
      },

      book: function(id) {
        Controller.view('bookReviews', {'id': id})
      },

      bookQuestions: function(id) {
        Controller.view('bookQuestions', {'id': id})
      },

      bookReviews: function(id) {
        Controller.view('bookReviews', {'id': id})
      },

      bookEdit: function(id) {
        Controller.view('bookEdit', {'id': id})
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
        Controller.view('signin')
      },

      signup: function() {
        Controller.view('signup')
      },

      signout: function() {
        this.user.logOut()
      },

      userPage: function() {
        // var that = this
        // this.requireLogin({
        //  success: function() {
        //    Controller.view('user', that.user.id)
        //  },
        //  error: function() {
        //    Controller.view('noUser')
        //  }
        // })
        Controller.view('user', this.user.id)
      },

      booksFavorites: function() {
        // var that = this
        // this.requireLogin({
        //  success: function() {
        //    Controller.view('booksFavorites', that.user.id)
        //  },
        //  error: function() {
        //    Controller.view('noFavorites')
        //  }
        // })
        Controller.view('booksFavorites', this.user.id)
      },

      booksRecent: function() {
        // var that = this
        // this.requireLogin({
        //  success: function() {
        //    Controller.view('booksRecent', that.user.id)
        //  },
        //  error: function() {
        //    Controller.view('noRecent')
        //  }
        // })
        Controller.view('booksRecent', this.user.id)
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
          Controller.userId = id
        }
        var signOut = function() {
          that.userId = undefined
          Controller.userId = undefined
          Backbone.history.history.back()
        }
        var search = function(query) {
          var url = Backbone.history.fragment.slice(2)
          if (url.indexOf('books') === 0) {
            that.navigate('/books/search/' + query, true)
          } else if (url.indexOf('questions') === 0) {
            that.navigate('/questions/search/' + query, true)
          }
        }

        var yell = function(options) {
          console.log('controller:transition happened')
          console.log(options)
        }

        var eventHandler = {
          'user:signout':       signOut,
          'user:signed':        signed,
          'search':             search,

          'controller:transition': yell
        }

        for (var event in eventHandler) {
          that.listener.listenTo(Backbone, event, eventHandler[event])
        }
      }
    })

    return Router
  }
);
