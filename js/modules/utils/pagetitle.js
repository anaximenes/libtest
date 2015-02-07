define([
    'backbone'
  ], function(Backbone) {
  var TitleHandler = Backbone.View.extend({
    state: 'other',

    set: function(title) {
      document.title = (title ? title  : 'Research Library')
    },

    go: function(options) {
      if (['book', 'bookEdit', 'bookReviews', 'bookQuestions'].indexOf(options.page) != -1) {
        this.state = 'book'
      } else if (['question', 'questionAnswers'].indexOf(options.page) != -1) {
        this.state = 'question'
      } else {
        this.state = 'other'
        this.set()
      }
    },

    book: function(model) {
      if (this.state === 'book') {
        this.set(model.get('title'))
      }
    },

    question: function(model) {
      if (this.state === 'question') {
        this.set(model.get('title'))
      }
    },

    initialize: function() {
      this.listenTo(Backbone, 'page:rendered', this.go)
      this.listenTo(Backbone, 'book:fetched', this.book)
      this.listenTo(Backbone, 'question:fetched', this.question)
    }
  })

  return TitleHandler
})
