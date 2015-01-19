define([
		'jquery',
		'underscore',
		'backbone',
		'modules/answers/models/book',
		'modules/answers/collections/answers',
		'modules/answers/views/listitem'
	],
	function($, _, Backbone, Model, Collection, ListItemView) {
	    var CollectionView = Backbone.View.extend({
	        model: Model,
	        views: [],

	        render: function() {
	            for (var i = 0; i < this.views.length; i++) {
	                this.$el.append(this.views[i].render().el)
	            }
	            return this
	        },

	        initialize: function(options) {
	            var collection = new Collection()
	            var that = this
	            collection.fetch({
	                success: function(response) {
	                    _.each(response.models, function(model) {
	                        that.views.push(new ListItemView({
	                        						model: model
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
	        	for (var i = this.views.length - 1; i >= 0; --i) {
	        		this.views[i].remove()
	        		this.views.pop()
	        	}
	        	Backbone.View.prototype.remove.call(this);
	        }
	    })
	
		return CollectionView
	}
)
