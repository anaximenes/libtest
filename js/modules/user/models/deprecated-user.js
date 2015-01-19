define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/user/collections/favorites'
	],
	function($, _, Backbone, Url, FavoritesCollection) {
		var UserModel = Backbone.Model.extend({
			id: 30479,
			favorites: [],

			//...
			status: false,

			loggedIn: function() {
				return status
			},

			logOut: function() {
				this.status = false
			},
			logIn: function() {
				this.status = true
			},

			isFavorite: function(id) {
				return (this.favorites.get(id) != undefined)
			},

			toggleFavorite: function(id) {
				this.favorites.toggleFavorite(id)
			},

			initialize: function() {
				this.favorites = new FavoritesCollection(this.get('favorites'), {userId: this.id})
				this.favorites.fetch()
			}
		})
		
		return UserModel
	}
)
