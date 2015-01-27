define([
  'jquery',
  'underscore',
  'backbone'
  ], function ($, _, Backbone) {
    var PageableCollection = Backbone.Collection.extend({
      currentPage: 0,
      parsed: false,

      fetchPage: function(page, options) {
        var url = this.url
        options = options || {}

        stringUrl = (typeof(this.url) === 'function' ? this.url() : this.url)
        var prefix = (stringUrl.indexOf('?') > -1 ? '&' : '?')
        this.url = page ? stringUrl + prefix + 'start=' + page : stringUrl
        options.remove = false
        Backbone.Collection.prototype.fetch.call(this, options)

        this.url = url
      },

      fetch: function(options) {
        this.fetchPage(this.currentPage, options)
      },

      updateAll: function() {
        for (var i = 0; i <= this.currentPage; ++i) {
          this.fetchPage(i)
        }
      },

      thereIsMore: function() {
        return (this.currentPage + 2) in this.pages
      },
      isOnLastPage: function() {
        return this.pages[this.currentPage + 2] === undefined
      },
      isOnFirstPage: function() {
        return this.currentPage === 0
      },
      nextPage: function() {
        ++this.currentPage
      },
      previous: function() {
        --this.currentPage
      },
      loadMore: function(options) {
        ++this.currentPage
        this.fetch(options)
      },

      parse: function(response) {
        this.parsed = true
        this.totalEntries = response.total
        // this.currentPage = response.current
        this.pages = _.extend(this.pages, response.pages)
        return response.results
      },

      initialize: function (models, options) {
        this.pages = {}
        this.models = models || []
        options = options || {}
        if (options.currentPage) this.currentPage = options.currentPage
        console.log('on page: ' + this.currentPage)
      }
    })

    return PageableCollection
  }
)
