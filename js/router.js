define([
		'jquery',
		'underscore',
		'backbone',
		'controller',
		'modules/user/main'
	],
	function($, _, Backbone, Controller, User) {
		var Router = Backbone.Router.extend({
			listener: new Backbone.View(),

			// requireLogin: function(action) {
			// 	if (this.user.loggedIn()) {
			// 		action.success()
			// 	} else {
			// 		action.error === undefined ?
			// 			this.navigate('!/signin/', {trigger: true, replace: true})
			// 			:
			// 			action.error()
			// 	}
			// },

			// ifLogged: function (callback) {
			// 	this.requireLogin({success: callback, error: function() {}})
			// },

			routes: {
				'!/books(/p:page)(/)':       'books',
				'!/books/favorites(/)':  	 'booksFavorites',
				'!/books/recent(/)':  	     'booksRecent',
				'!/books/:id(/)':            'book',
				'!/books/:id/questions':     'bookQuestions',
				'!/books/:id/reviews':       'bookReviews',
				'!/books/:id/edit':          'bookEdit',
				'!/questions(p:page)(/)':    'questions',
				'!/questions/favorites(/)':  'questionsFavorites',
				'!/questions/:id(/)':        'question',
				'!/signin(/)':               'signin',
				'!/signout(/)':              'signout',
				'!/users/:id(/)':            'user',
				'!/users/:id/favorites(/)':  'favorites',
				'!/test(/)':                 'test',
				'*path':                     'root'
			},

			root: function() {
				this.navigate('!/books', true)
			},

			books: function(page) {
				Controller.view('books', page)
			},

			book: function(id) {
				Controller.view('bookReviews', {'id': id})
			},

			bookQuestions: function(id) {
				Controller.view('bookQuestions', {'id': id})
			},

			bookReviews: function(id) {
				Controller.view('bookReviews', {'id': id})
			},

			bookEdit: function(id) {
				Controller.view('bookEdit', {'id': id})
			},

			questions: function(page) {
				Controller.view('questions', page)
			},

			question: function(id) {
				Controller.view('question', {'id': id})
			},

			signin: function() {
				Controller.view('signin')
			},

			signout: function() {
				this.user.logOut()
			},

			user: function() {
				Controller.view('user', this.userId)
			},

			booksFavorites: function() {
				console.log('### ', this.userId)
				Controller.view('booksFavorites', this.userId)
			},

			booksRecent: function() {
				console.log('### ', this.userId)
				Controller.view('booksRecent', this.userId)
			},

			questionsFavorites: function() {
				console.log('### ', this.userId)
				Controller.view('questionsFavorites', this.userId)
			},

			test: function() {
				Controller.view('test')
				// this.requireLogin({
				// 	success: function() {
				// 		Controller.view('test', 'loggedIn')
				// 	}
				// })
			},

			initialize: function() {
				var that = this
				this.userId = undefined

				var signed = function(id) {
					that.userId = id
				}
				var openBook = function(obj) {
					that.navigate('!/books/' + obj.model.get('id') + '/', true)
				}
				var openQuestion = function(obj) {
					that.navigate('!/questions/' + obj.model.get('id') + '/', true)
				}
				var signIn = function(id) {
					console.log('sign in ', id)
					that.userId = id
					Controller.userId = id
					Backbone.history.history.back()
				}
				var signOut = function() {
					that.userId = undefined
					Controller.userId = undefined
					Backbone.history.history.back()
				}
				var back = function() {
					console.log('BACK')
					Backbone.history.back()
				}

				var eventHandler = {
					'book:open':          openBook,
					'question:open':      openQuestion,
					'user:signin':        signIn,
					'user:signout':       signOut,
					'user:signed':        signed,
					'backstrip':          back
				}

				for (var event in eventHandler) {
					that.listener.listenTo(Backbone, event, eventHandler[event])
				}
			}
		})

		return Router
	}
);
