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
            Backbone.trigger('book:fetched', model)
          }
        })

        //------------------------------------------------------------------------------

        var menu = Menu.add('sub', [
          {page: 'bookReviews', title: 'Reviews', path: '/books/' + bookId + '/reviews/'},
          {page: 'bookQuestions', title: 'Questions', path: '/books/' + bookId + '/questions/'}
        ])

        //------------------------------------------------------------------------------

        var postForm = new Post.UserPostView({
          id: bookId,
          collection: bottom.collection,
          show: true
        })

        //------------------------------------------------------------------------------

        ContainerView.prototype.initialize.call(this, [card, menu, postForm, bottom])

      }
    })

    return BookPage
  }
)
