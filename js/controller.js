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
    'modules/utils/template',
    'modules/utils/main',
    // 'modules/template'
  ],
  function($, _, Backbone, BookModule, QuestionModule, ReviewModule, SearchView, Menu, User, Url, BookPage, QuestionPage, Static, TM, Utils) {
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
        var questions = new QuestionModule.FramedListView({collection: collection, listType: 'bookQuestions'})

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
        var reviews = new ReviewModule.FramedListView({collection: collection, listType: 'bookReviews'})

        var view = new BookPage(book.id, reviews)
        return view
      },

      bookEdit: function(book) {
        Menu.set({path: '/books/' + book.id + '/'})
        currentState.subMenu = Menu.get('book')
        $subHeaderDom.html(currentState.subMenu.render().el)

        var model = new BookModule.Model({'id': book.id})
        var view = new BookModule.EditView({'model': model})
        model.fetch()
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

      user: function() {
        var view = new Backbone.View()
        console.log('yo doug')
        return view
      },

      test: function(status) {
        // var view = new Static({template: TMP.get('')})

        // TM.get('a', function(res) {
        //   console.log(res)
        //   view.template = res
        //   view.render()
        // })
        return view
      }
    }

    return Controller
  }
);
