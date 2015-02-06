define([
  'jquery',
  'underscore',
  'backbone'
  ],
  function($, _, Backbone) {
    ogMap = function(model) {
      model || (model = new Backbone.Model())
      return {
        'type':         'books.book',
        'url':          '//reslib.org/books/' + model.id + '/',
        'title':         model.get('title'),
        'author':        model.get('author'),
        'description':   model.get('description'),
        'image':         '//reslib.org/pict/' + model.get('picture'),
        'isbn':          model.get('isbn13') || model.get('isbn10')
      }
    }

    var setMetaTags = function(model){
      var fields = ogMap(model)
      for (var i in fields) {
        $('meta[name="og:' + i + '"]').remove();
        if (model) {
          $('head').append('<meta name="og:' + i + '" content="' + fields[i] + '">');
        }
      }
    }

    var OG = Backbone.View.extend({
      handleTransition: function(options) {
        if (['book', 'bookEdit', 'bookReviews', 'bookQuestions'].indexOf(options.page) != -1) {
          this.bookId = options.options.id
        } else {
          this.bookId = undefined
          this.model = undefined
          this.render()
        }
      },

      getBookModel: function(model) {
        if (this.bookId === model.id) {
          this.model = model
          this.render()
        }
      },

      render: function() {
        setMetaTags(this.model)
      },

      initialize: function() {
        this.render()
        this.listenTo(Backbone, 'page:rendered', this.handleTransition)
        this.listenTo(Backbone, 'book:fetched', this.getBookModel)
      }
    })

    return OG
  }
)
