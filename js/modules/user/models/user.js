define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/user/models/auth'
	],
	function($, _, Backbone, Url, AuthModel) {
		var UserModel = Backbone.Model.extend({
			id: undefined,

			isLogged: function() {
				var user = new Model();
				user.fetch({
					success: function(model, response) {
						return model.id
					}
				})
			},

			logOut: function() {
				if (typeof(this.id) != 'undefined') {
					console.log('hi!')
					var model = new AuthModel({'id': this.id});
					console.log(model)
					model.destroy({url: Url('session'),
						success: function() {
							console.log('signed out!')
							Backbone.trigger('user:signout')
						}
					})
				}
			},

			toggleFavorite: function(book) {
				var url = Url('favorites', this.id)
				console.log(url)

				var Collection = Backbone.Collection.extend({
					url: url
				})
				var collection = new Collection()
				
				var model = new Backbone.Model({
					id: book.id,
					urlRoot: url
				})

				var fetch = function() {
					book.fetch()
				}

				if (book.get('isFavorite')) {
					model.destroy({
						url: url + book.id, 
						success: fetch,
						error: fetch
					})
				} else {
					collection.create({id: book.id}, {
						success: fetch,
						error: fetch
					})
				}
			},

			post: function(where, options) {
				var model = new Backbone.Model({
					usersId: this.id,
					booksId: (options.id ? options.id : null),
					title: options.title,
					body: options.body
				})
				model.url = Url(where, this.id)
				console.log(model)

				model.save({
					success: function(response) {
						console.log(response)
					}
				})
			},

			postQuestion: function(options) {
				this.post('userQuestions', options)
			},

			postReview: function(options) {
				this.post('userReviews', options)
			},

			initialize: function() {
				var that = this
				var user = new AuthModel()
				user.fetch({
					success: function(model, response) {
						that.set('id', model.id)
						console.log(that.id)
						if (model.id) Backbone.trigger('user:signed', model.id)
					}, error: function(e) {
						console.log(e)
					}
				})

				this.listenTo(Backbone, 'book:toggleFavorite', this.toggleFavorite)
				this.listenTo(Backbone, 'post:question', this.postQuestion)
				this.listenTo(Backbone, 'post:review', this.postReview)
				this.listenTo(Backbone, 'user:signin', function(id) {
					that.id = id
				})
			}
		})
		
		return UserModel
	}
)
