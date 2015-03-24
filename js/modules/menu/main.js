define([
    'jquery',
    'underscore',
    'backbone',
    'modules/menu/views/menu',
    'modules/menu/collections/items',
    'modules/menu/models/item',
  ],
  function($, _, Backbone, MenuView, MenuItems, MenuItem) {
    var menuCollection = {}

    var Menu = {
      View:  MenuView,
      Items: MenuItems,
      Item:  MenuItem,

      base: '/books/',

      userSignedIn: false,

      // create menu given items (pages)
      add: function(menu, pages) {
        var models = []
        for (var i = 0; i < pages.length; ++i) {
          models.push(new this.Item(pages[i]))
        }
        return new this.View({
          collection: new Menu.Items(models, {menu: menu})
        })
      },

      // menu items to be created in each menu
      pages: function(menu) {
        return {
          'header': [
            {page: 'books', title: 'Books', path: '/books/'},
            {page: 'questions', title: 'Questions', path: '/questions/'}
          ],
          'books':
            [{page: 'all', title: 'all', path: '/books/'},
            {page: 'favorites', title: 'favorites', path: '/books/favorites/'},
            {page: 'recent', title: 'recent', path: '/books/recent/'},
            // (this.userSignedIn ?
            //   {page: 'addBook', title: 'add book', path: '/books/add/'} :
            //   {page: 'addBook', title: 'add book', path: '/signin/'}
            // )
          ],
          'book': [
            {page: 'description', title: 'description', path: this.base},
            {page: 'read', title: 'currently unavailable', path: ''},
            {page: 'report', title: 'report', path: this.base + 'report/', toRight: true}
          ],
          'questions':
            [{page: 'all', title: 'all', path: '/questions/'},
          ],
          'user': [
            {page: 'userQuestions', title: 'questions', path: '/user/questions/'},
            {page: 'userAnswers', title: 'answers', path: '/user/answers/'},
            // {page: 'info', title: 'info', path: '/user/'}
          ]
        }[menu]
      },

      set: function(options) {
        if (['book', 'bookEdit', 'bookReviews', 'bookQuestions', 'bookReport'].indexOf(options.page) != -1) {
          this.base = '/books/' + options.options.id + '/'
        } else {
          this.base = '/books/'
        }
      },

      get: function(menu) {
        return this.add(menu, this.pages(menu))
        // return menuCollection[menu] || (menuCollection[menu] = Menu.add(menu, Menu.pages(menu)))
      }
    }

    _.extend(Menu, Backbone.Events)

    Menu.initialize = function() {
      this.listenTo(Backbone, 'page:render', this.set)
      this.listenTo(Backbone, 'user:signed', function() {
        this.userSignedIn = true;
      }.bind(this))
      this.listenTo(Backbone, 'user:signout', function() {
        this.userSignedIn = false;
      }.bind(this))
    }
    Menu.initialize()

    return Menu
  }
)
