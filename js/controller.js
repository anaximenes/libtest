define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/main',
		'modules/questions/main',
		'modules/user/main',
		'modules/utils/url',
		'modules/utils/pageablecollection'
	],
	function($, _, Backbone, BookModule, QuestionModule, User, Url, PageableCollection) {
		var currentState = {}

		var Controller = {
			currentView: undefined,

			view: function(page, params) {
				console.log('Controller: ' + page)
				if (this.currentView) this.currentView.remove();
				this.currentView = this[page](params)
				$('#page').html(this.currentView.render().el)
			},

			books: function(params) {
				$('.active').removeClass('active')
				$('#page-books').addClass('active')
				currentState.books = currentState.books ? currentState.books : new BookModule.PaginatedCollection()
				return new BookModule.ListViewPaginated({collection: currentState.books, isFavorite: params.isFavorite})
			},

			book: function(book) {
				$('.active').removeClass('active')
				$('#page-books').addClass('active')
				var model = new BookModule.Model({'id': book.id})
				var view = new BookModule.CardView({'model': model})
				model.fetch() // ({'success': function(a) {console.log('model fetched')}})
				return view
			},

			questions: function() {
				$('.active').removeClass('active')
				$('#page-questions').addClass('active')
				return new QuestionModule.ListView()
			},

			question: function(question) {
				$('.active').removeClass('active')
				$('#page-questions').addClass('active')
				var model = new QuestionModule.Model({'id': question.id})
				var view = new QuestionModule.CardView({'model': model})
				model.fetch() //{'success': function(a) {console.log('model fetched')}})
				return view
			},

			signin: function() {
				$('.active').removeClass('active')
				$('#page-signin').addClass('active')
				var view = new User.signinView()
				return view
			},

			user: function() {

			},

			test: function(status) {
				// var template = _.template('<h3> <%=status%> </h3>')
				// var View = Backbone.View.extend({
				// 	el: template({status: status}),
				// 	render: function() {
				// 		return this
				// 	}
				// })
				// return new View
			}
		}

		return Controller
	}
);
