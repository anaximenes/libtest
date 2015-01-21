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
					model.destroy({url: 'http://beta.reslib.org/api/session',
						success: function() {
							console.log('success!')
							Backbone.trigger('user:signout')
						}
					})
				}
			},

			toggleFavorite: function(book) {
				var url = 'http://beta.reslib.org/api/users/' + this.id + '/favorites/'

				var Collection = Backbone.Collection.extend({
					url: url
				})
				var collection = new Collection()
				
				var model = new Backbone.Model({
					id: book.id,
					urlRoot: url
				})

				if (book.get('isFavorite')) {
					model.destroy({
						url: url + book.id, 
						success: function() {
							book.fetch()
						}
					})
				} else {
					collection.create({id: book.id}, {
						success: function() {
						}
					})
				}
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
				this.listenTo(Backbone, 'user:signin', function(id) {
					that.id = id
				})
			}
		})
		
		return UserModel
	}
)
