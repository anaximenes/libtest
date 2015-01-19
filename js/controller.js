define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/main',
		'modules/questions/main',
		'headerview',
		'modules/menu/main',
		'modules/user/main',
		'modules/utils/url',
		'modules/bookpage'
	],
	function($, _, Backbone, BookModule, QuestionModule, HeaderView, Menu, User, Url, BookPage) {
		var currentState = {}

		var Controller = {
			currentView: undefined,

			view: function(page, params) {
				if (currentState.menu === undefined) {
					var models = [new Menu.Item({name: 'books'}), new Menu.Item({name:'questions'})]
					currentState.menu = new Menu.View({
							collection: new Menu.Items(models, {
								menu: 'header'
							})
						})
					$('#header').html(currentState.menu.render().el)
				}

				console.log('Controller: ' + page)
				Backbone.trigger('controller:transition', {menu: 'header', page: page})

				if (this.currentView) this.currentView.remove();
				this.currentView = this[page](params)
				$('#page').html(this.currentView.render().el)

				Backbone.trigger('menu:activate', {menu: 'sub', page: 'questions'})
				// Backbone.trigger('controller:rendered', {page: page, options: params})
			},

			books: function(page) {
				currentState.books = currentState.books ? currentState.books : new BookModule.PagedCollection()
				currentState.books.currentPage = page || currentState.books.currentPage || 0

				return new BookModule.FramedListView({collection: currentState.books})
			},

			book: function(book) {
				var view = new BookPage(book.id)
				return view
			},

			questions: function(page) {
				currentState.questions = currentState.questions ? currentState.questions : new QuestionModule.PagedCollection()
				currentState.questions.currentPage = page

				return new QuestionModule.FramedListView({collection: currentState.questions})
			},

			question: function(question) {
				var model = new QuestionModule.Model({'id': question.id})
				var view = new QuestionModule.CardView({'model': model})
				model.fetch() //{'success': function(a) {console.log('model fetched')}})
				return view
			},

			signin: function() {
				var view = new User.signinView()
				return view
			},

			user: function() {

			},

			favorites: function(userId) {
				var view = new BookModule.PagedListView({
					collection: new BookModule.PagedCollection([], {
						url: function() {
							return Url('favorites', userId)
						}
					})
				})
				return view
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
