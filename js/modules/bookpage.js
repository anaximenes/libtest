define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/books/main',
		'modules/questions/main',
		'modules/menu/main',
		'modules/utils/containerview',
		'modules/post/main',
		'modules/static/views/view'
	],
	function($, _, Backbone, Url, Books, Questions, Menu, ContainerView, Post, Static) {
		var BookPage = ContainerView.extend({
			initialize: function(bookId, bottom) {
				var model = new Books.Model({'id': bookId})
				var card = new Books.CardView({'model': model})
				
				model.fetch({
					success: function() {
						console.log(model)
						Backbone.trigger('menu:extend', {
													menu: 'header',
													page: 'add',
													path: '#!/books/' + bookId + '/',
													title: model.get('title')
												})
					}
				})

				//------------------------------------------------------------------------------

				var postButton = '</a><button type="button" id="post-show-button" class="btn btn-default btn-lg" style="padding-top: 4px; padding-bottom: 4px"> Post </button><a>'

				var menu = Menu.add('sub', [
							{page: 'bookReviews', title: 'Reviews', path: '#!/books/' + bookId + '/reviews/'},
							{page: 'bookQuestions', title: 'Questions', path: '#!/books/' + bookId + '/questions/'},
							{page: 'add', title: postButton, path: '#', full: true}
						]
				)
				
				this.listenTo(Backbone, 'menu:click', function(options) {
					if (options.menu === 'sub' && options.page === 'add') {
						Backbone.trigger('post:show')
						menu.$el.find('#post-show-button').toggleClass('active')
					}
				})

				//------------------------------------------------------------------------------

				var add = new Static({template: $('#template-static-ask-question').html()})

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
				ContainerView.prototype.initialize.call(this, [card, menu, postForm, bottom, add])
				
			}
		})

		return BookPage
	}
)
