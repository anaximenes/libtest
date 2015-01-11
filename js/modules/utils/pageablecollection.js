define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {
		var PageableCollection = Backbone.Collection.extend({
			currentPage: 0,

			fetch: function(options) {
				var url = this.url
				this.url = this.currentPage ? this.url() + '?start=' + this.currentPage : this.url
				options.remove = false
				Backbone.Collection.prototype.fetch.call(this, options)
				this.url = url
			},

			lastPage: function() {
				return this.pages.length - 1
			},
			firstPage: function() {
				return 0
			},
			thereIsMore: function() {
				return this.currentPage < this.lastPage()
			},
			isLast: function() {
				return this.currentPage == this.lastPage()
			},
			isFirst: function() {
				return this.currentPage == 0
			},
			next: function() {
				++currentPage
			},
			previous: function() {
				--currentPage
			},

			parse: function(response) {
				this.totalEntries = response.total
				this.currentPage = response.current
				this.pages = response.pages
				return response.results
			},

			initialize: function (params) {
				// this.url = params.url
			}
		})

		return PageableCollection
	}
)