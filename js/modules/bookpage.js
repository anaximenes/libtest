define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/books/main',
		'modules/questions/main',
		'modules/menu/main',
		'modules/utils/containerview',
		'modules/post/main'
	],
	function($, _, Backbone, Url, Books, Questions, Menu, ContainerView, Post) {
		var BookPage = ContainerView.extend({
			initialize: function(bookId, bottom) {
				var model = new Books.Model({'id': bookId})
				var card = new Books.CardView({'model': model})
				
				model.fetch({
					success: function() {
						Backbone.trigger('menu:additional', {
													page: 'book',
													model: model, 
													path: '#!/books/' + bookId + '/',
													menu: 'header'
												})
					}
				})

				//------------------------------------------------------------------------------

				var postButton = '</a><button type="button" id="post-show-button" class="btn btn-default btn-lg" style="padding-top: 4px; padding-bottom: 4px"> Post </button><a>'

				var menu = new Menu.View({
					collection: new Menu.Items([
							new Menu.Item({page: 'bookReviews', path: '#!/books/' + bookId + '/reviews/'}),
							new Menu.Item({page: 'bookQuestions', path: '#!/books/' + bookId + '/questions/'}),
							new Menu.Item({page: 'add', title: postButton, full: true})
							// new Menu.Item({name: 'postComment'})
						], {
							menu: 'sub'
						}
					)
				})
				this.listenTo(Backbone, 'menu:click', function(options) {
					if (options.menu === 'sub' && options.page === 'add') {
						Backbone.trigger('post:show')
						menu.$el.find('#post-show-button').toggleClass('active')
					}
				})

				//------------------------------------------------------------------------------
				
				var postForm = new Post.view({id: bookId})

				//------------------------------------------------------------------------------

				// var collection = new Questions.PagedCollection([], {
				// 	url: function() {
				// 		return Url('bookComments', bookId)
				// 	}
				// })
				// var comments = new Questions.FramedListView({collection: collection, listType: 'bookComments'})

				//------------------------------------------------------------------------------
				ContainerView.prototype.initialize.call(this, [card, menu, postForm, bottom])
				
			}
		})

		return BookPage
	}
)
