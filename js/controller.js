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
    'modules/static/views/view',
    'modules/nodata/main',
    'modules/utils/main',
    'modules/feedback/main',
  ],
  function($, _, Backbone, BookModule, QuestionModule, ReviewModule, AnswerModule, SearchView, Menu, User, Static, NoData, Utils, FeedbackModule) {
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
        new FeedbackModule.ButtonView();
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

      booksAdd: function(userId) {
        currentState.subMenu = Menu.get('books');

        return BookModule.getAddView(userId);
      },

      bookQuestions: function(book) {
        currentState.subMenu = Menu.get('book')

        var collection = new QuestionModule.PagedCollection([], {
          url: function() {
            return Utils.Url('bookQuestions', book.id)
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
            return Utils.Url('bookReviews', book.id)
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
        return QuestionModule.getAllView()
      },

      questionsSearch: function(query) {
        currentState.subMenu = Menu.add('questions', [
          {page: 'all', title: 'all', path: '/questions/'},
          {page: 'search', path: '/books/search/' + query, title: '"' + query + '"'}
        ])

        return QuestionModule.getSearchView(query)
      },

      questionAnswers: function(question) {
        var collection = new AnswerModule.PagedCollection([], {
          url: function() {
            return Utils.Url('questionAnswers', question.id)
          }
        })
        var answers = new AnswerModule.FramedListView({collection: collection})

        return QuestionModule.getQuestionPageView(question.id, answers)
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
          // toRight: true
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
          // toRight: true
        })
        currentState.subMenu = Menu.get('user')

        var collection = new AnswerModule.PagedCollection([], { url: Utils.Url('userAnswers', id) })
        var view = new AnswerModule.FramedListView({ collection: collection })
        return view
      },

      feedback: function (id) {
        Backbone.trigger('menu:extend', {
          menu: 'header',
          page: 'feedback',
          title: 'Feedback',
          path: '/feedback/'
        });

        var view = new FeedbackModule.FormView();
        return view;
      },

      userQuestions: function(id) {
        Backbone.trigger('menu:extend', {
          menu: 'header',
          page: 'profile',
          title: 'Profile',
          path: '/user/',
          // toRight: true
        })
        currentState.subMenu = Menu.get('user')

        var collection = new QuestionModule.PagedCollection([], { url: Utils.Url('userQuestions', id) })
        var view = new QuestionModule.FramedListView({ collection: collection })
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
        return BookModule.getAllGridView()
        //development playground
        var view = new (Static.extend({
          render: function() {
            Static.prototype.render.call(this)

            this.$('.select-test').selectize({
              delimiter: ',',
              persist: false,
              valueField: 'id',
              labelField: 'title',
              searchField: 'title',
              create: function(input, callback) {
                var a = {title: input, id: 100}
                callback(a)
              },
              render: {
                option: function(item, escape) {
                  return '<div>' + escape(item.title) + '</div>'
                }
              },
              load: function(query, callback) {
                if (!query.length) return callback()

                $.ajax({
                  type: 'GET',
                  url: Utils.Url('tags'),
                  success: function(data) {
                    callback(data.results)
                  }
                })
              }
            })

            return this
          },

          initialize: function() {
          }
        }))()

        require(['text!templates/test.html'], function(template) {
          view.template = _.template(template)
          view.render()
        })
        return view
      }
    }

    return Controller
  }
);
