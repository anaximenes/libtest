define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {
		var PageableCollection = Backbone.Collection.extend({
			currentPage: 0,
			parsed: false,

			fetch: function(options) {
				var url = this.url
				this.url = this.currentPage ? this.url() + '?start=' + this.currentPage : this.url
				options.remove = false
				Backbone.Collection.prototype.fetch.call(this, options)
				this.url = url
			},

			thereIsMore: function() {
				return (this.currentPage + 2) in this.pages
			},
			isOnLastPage: function() {
				// console.log('isonlast')
				// console.log(this.currentPage)
				// console.log(this.pages)
				// if (this.pages === undefined) return false
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
				// 
				// this.url = params.url
			}
		})

		return PageableCollection
	}
)
