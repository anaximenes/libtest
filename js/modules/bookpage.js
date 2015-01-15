define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/books/main',
		'modules/questions/main',
		// 'modules/comments/main',
		'modules/utils/containerview'
	],
	// function($, _, Backbone, Url, Books, Comments, ContainerView) {
	function($, _, Backbone, Url, Books, Questions, ContainerView) {
		var BookPage = ContainerView.extend({
			initialize: function(bookId) {
				var model = new Books.Model({'id': bookId})
				var card = new Books.CardView({'model': model})
				model.fetch()

				// var collection = new Comments.Collection([], {
				var collection = new Questions.PagedCollection([], {
					url: function() {
						return Url('bookComments', bookId)
					}
				})
				var comments = new Questions.FramedListView({collection: collection})
				// var comments = new Comments.ListView({collection: collection})

				ContainerView.prototype.initialize.call(this, [card, comments])
				// ContainerView.prototype.initialize.call(this, [card, comments])
			}
		})

		return BookPage
	}
)
