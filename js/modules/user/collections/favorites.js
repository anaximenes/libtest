define([
		'jquery',
		'underscore',
		'backbone',
		'modules/user/models/user',
		'modules/user/models/favorite',
		'url'
	],
	function($, _, Backbone, UserModel, FavoriteModel, Url) {
	    var FavoritesCollection = Backbone.Collection.extend({
	    	userId: undefined,
	        model: FavoriteModel,
	        url: function() {
	        	return Url('favorites', this.userId)
	        },

	        parse: function(what) {
	            return what
	        },

	        toggleFavorite: function(id) {
	        	// console.log('FavoritesCollection: toggle')
	        	var model = this.get(id)
	        	// console.log(this.models)
	        	if (model) {
	        		// console.log('existed')
	        		this.remove(model)
	        	} else {
	        		// console.log("didn't exist")
	        		model = new FavoriteModel({id: id})
	        		this.add(model)
	        	}
	        	Backbone.trigger('book:favorite:changed', id)
	        	// this.sync()
	        },

	        initialize: function(models, options) {
	        	this.userId = options.userId
	        }
	    })

	    return FavoritesCollection
	}
)
