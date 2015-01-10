define([
		'jquery',
		'underscore',
		'backbone',
		'url',
		'modules/user/collections/favorites'
	],
	function($, _, Backbone, Url, FavoritesCollection) {
		var UserModel = Backbone.Model.extend({
			id: 1,
			favorites: [],

			loggedIn: function() {
				return false
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
