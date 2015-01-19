define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/user/collections/favorites'
	],
	function($, _, Backbone, Url, FavoritesCollection) {
		var UserModel = Backbone.Model.extend({
			isLogged: function() {
				var user = new Model();
				user.fetch({
					success: function(model, response) {
						return model.id
					}
				})
			}
		})
		
		return UserModel
	}
)
