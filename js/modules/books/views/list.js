define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/models/book',
		'modules/books/collections/collection',
		'modules/books/views/listitem'
	],
	function($, _, Backbone, BookModel, BooksCollection, ListItemView) {
	    var CollectionView = Backbone.View.extend({
	        model: BookModel,
	        isFavorite: undefined,
	        views: [],

	        render: function() {
	            for (var i = 0; i < this.views.length; i++) {
	                this.$el.append(this.views[i].render().el)
	            }
	            return this
	        },

	        initialize: function(options) {
	        	this.isFavorite = options.isFavorite
	            var collection = new BooksCollection()
	            var that = this
	            collection.fetch({
	                success: function(response) {
	                    _.each(response.models, function(model) {
	                        that.views.push(new ListItemView({
	                        						model: model, 
	                        						isFavorite: that.isFavorite
	                        					})
	                        				)
	                    })
	                    that.render()
	                },
	                error: function(e) {
	                	console.log('error ' + e)
	                }
	            })
	        },

	        remove: function() {
	        	for (var i = this.views.length - 1; i>= 0; --i) {
	        		this.views[i].remove()
	        		this.views.pop()
	        	}
	        	Backbone.View.prototype.remove.call(this);
	        }
	    })
	
		return CollectionView
	}
)
