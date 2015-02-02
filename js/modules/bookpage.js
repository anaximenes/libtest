define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/books/main',
    'modules/questions/main',
    'modules/menu/main',
    'modules/utils/containerview',
    'modules/post/main',
    'modules/static/views/view'
  ],
  function($, _, Backbone, Url, Books, Questions, Menu, ContainerView, Post, Static) {
    var BookPage = ContainerView.extend({
      initialize: function(bookId, bottom) {
        var model = new Books.Model({'id': bookId})
        var card = new Books.CardView({'model': model})
        
        model.fetch({
          success: function() {
            Backbone.trigger('menu:extend', {
                menu: 'header',
                page: 'add',
                path: '/books/' + bookId + '/',
                title: '"' + model.get('title') + '"'
            })
            Backbone.trigger('menu:extend', {
              menu: 'book',
              page: 'read',
              class: 'button-read',
              title: 'read',
              path: '/reader/web/viewer.html?file=' + encodeURIComponent('http://178.63.105.73/pdf/' + btoa(model.get('sourceUrl')))
            })
            Backbone.trigger('book:fetched', model)
          }
        })

        //------------------------------------------------------------------------------

        var menu = Menu.add('sub', [
              {page: 'bookReviews', title: 'Reviews', path: '/books/' + bookId + '/reviews/'},
              {page: 'bookQuestions', title: 'Questions', path: '/books/' + bookId + '/questions/'},
              {page: 'add', title: 'Post', path: '#', full: true}
            ]
        )
        
        this.listenTo(Backbone, 'menu:click', function(options) {
          if (options.menu === 'sub' && options.page === 'add') {
            Backbone.trigger('post:show')
            menu.$el.find('#post-show-button').toggleClass('active')
          }
        })

        //------------------------------------------------------------------------------

        // var add = new Static({template: $('#template-static-ask-question').html()})

        //------------------------------------------------------------------------------
        
        var postForm = new Post.UserPostView({id: bookId})

        //------------------------------------------------------------------------------

        ContainerView.prototype.initialize.call(this, [card, menu, postForm, bottom])
        
      }
    })

    return BookPage
  }
)
