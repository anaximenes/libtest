define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone) {
    var SearchBoxView = Backbone.View.extend({
      el: $('#search-bar'),

      events: {
        'submit': 'search',
        'click #search-button': 'search'
      },

      search: function(e) {
        e.preventDefault()
        var query = this.$('#search-query').val().trim()
        if (query) {
          Backbone.trigger('search', query)
        }
      },

      handleTransition: function(options) {
        if (options.page != 'booksSearch' && options.page != 'questionsSearch') {
          this.$('#search-query').val('')
        } else {
          this.$('#search-query').val(options.options)
        }
      },

      render: function() {
        return this
      },

      initialize: function (options) {
        this.listenTo(Backbone, 'page:rendered', this.handleTransition)
      }
    })

    return SearchBoxView
  }
)