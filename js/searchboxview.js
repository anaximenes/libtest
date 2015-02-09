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
        // query = encodeURIComponent(query)
        if (query) {
          Backbone.trigger('search', query)
        }
      },

      render: function() {
        return this
      },

      initialize: function (options) {
        this.listenTo(Backbone, 'page:rendered', function(options) {
          if (options.page != 'booksSearch' && options.page != 'questionsSearch')
          this.$('#search-query').val('')
        })
      }
    })

    return SearchBoxView
  }
)