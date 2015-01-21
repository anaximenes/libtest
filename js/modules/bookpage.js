define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/books/main',
		'modules/questions/main',
		'modules/menu/main',
		'modules/utils/containerview'
	],
	function($, _, Backbone, Url, Books, Questions, Menu, ContainerView) {
		var BookPage = ContainerView.extend({
			initialize: function(bookId, bottom) {
				var model = new Books.Model({'id': bookId})
				var card = new Books.CardView({'model': model})
				
				model.fetch({
					success: function() {
						console.log('#!/books/' + bookId)
						Backbone.trigger('menu:additional', {
													page: 'book',
													model: model, 
													path: '#!/books/' + bookId + '/',
													menu: 'header'
												})
					}
				})

				//------------------------------------------------------------------------------

				var menu = new Menu.View({
					collection: new Menu.Items([
							new Menu.Item({page: 'bookReviews', path: '#!/books/' + bookId + '/reviews'}),
							new Menu.Item({page: 'bookQuestions', path: '#!/books/' + bookId + '/questions'}),
							new Menu.Item({page: 'postComment'})
							// new Menu.Item({name: 'postComment'})
						], {
							menu: 'sub'
						}
					)
				})

				//------------------------------------------------------------------------------

				// var collection = new Questions.PagedCollection([], {
				// 	url: function() {
				// 		return Url('bookComments', bookId)
				// 	}
				// })
				// var comments = new Questions.FramedListView({collection: collection, listType: 'bookComments'})

				//------------------------------------------------------------------------------
				ContainerView.prototype.initialize.call(this, [card, menu, bottom])
				
			}
		})

		return BookPage
	}
)
