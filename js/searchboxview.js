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

      search: function() {
        event.preventDefault()
        var query = this.$el.find('#search-query').val()
        if (query) {
          Backbone.trigger('search', query)
        }
      },

      render: function() {
        return this
      },

      initialize: function (options) {
        this.listenTo(Backbone, 'controller:transition', function() {
          this.$el.find('#search-query').val('')
        })
      }
    })

    return SearchBoxView
  }
)