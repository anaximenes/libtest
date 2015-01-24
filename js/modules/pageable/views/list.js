define([
		'jquery',
		'underscore',
		'backbone',
	],
	function($, _, Backbone) {
	    var CollectionView = Backbone.View.extend({
	        model: Backbone.Model,
	        ItemView: Backbone.View,
	        processing: false,

	        loadUp: function() {
	        	if (this.processing) {
	        		return
	        	}
	        	var that = this
	        	if (this.collection.thereIsMore()) {
	        		this.processing = true
	        		this.collection.loadMore({
	            		success: function(collection, response) {
	            			that.processing = false
	            		}
	            	})
				}
	        	if (this.collection.isOnLastPage()) {
					Backbone.trigger('list:loaded', this.listType)
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
	        	this.views = []
	        	options = options ? options : {}
 	            this.collection = options.collection
 	            this.listType = options.listType
	            var that = this

	            if (this.collection.parsed && this.collection.isOnLastPage()) {
					Backbone.trigger('list:loaded', this.listType)
	            }

	            this.collection.updateAll()

	            this.collection.fetch({
	                success: function(response) {
			        	if (that.collection.isOnLastPage()) {
							Backbone.trigger('list:loaded', that.listType)
						}
	                }
	            })

	            this.listenTo(this.collection, 'add', this.addView)
	            this.listenTo(this.collection, 'reset remove', this.render)
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
