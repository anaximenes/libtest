define([
		'jquery',
		'underscore',
		'backbone',
	],
	function($, _, Backbone) {
	    var CollectionView = Backbone.View.extend({
	        views: [],
	        moel: Backbone.Model,
	        ItemView: Backbone.View,

	        loadUp: function() {
	        	if (this.collection.thereIsMore()) {
	        		this.collection.loadMore({
	            		success: function(collection, response) {
	            			// console.log(collection)
	            		}
	            	})
				}
	        },

	        addView: function(model) {
            	this.views.push(new this.ItemView({
					model: model
				}))
	            this.$el.append(this.views[this.views.length - 1].render().el)
	        },

	        render: function() {
	        	this.$el.empty()
	        	this.removeChildViews()
	            for (var i = 0; i < this.collection.length; i++) {
	            	this.views.push(new this.ItemView({
						model: this.collection.at(i)
					}))
	                this.$el.append(this.views[i].render().el)
				}
	            return this
	        },

	        initialize: function(options) {
	        	options = options ? options : {}
 	            this.collection = options.collection
	            var that = this

	            this.collection.fetch({
	                success: function(response) {
	                    // that.render()
	                },
	                error: function(e) {
	                	console.log('error ' + e)
	                }
	            })

	            this.listenTo(this.collection, 'add', this.addView)
	            this.listenTo(Backbone, 'page:scrollbottom', this.loadUp)
	        },

	        removeChildViews: function() {
	        	for (var i = this.views.length - 1; i >= 0; --i) {
	        		this.views[i].remove()
	        		this.views.pop()
	        	}
	        },

	        remove: function() {
	        	this.removeChildViews()
	        	Backbone.View.prototype.remove.call(this);
	        }
	    })
	
		return CollectionView
	}
)
