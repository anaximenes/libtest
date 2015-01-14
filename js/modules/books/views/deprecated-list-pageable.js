define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/models/book',
		'modules/books/collections/collection-paginated',
		'modules/books/views/listitem'
	],
	function($, _, Backbone, BookModel, BooksCollection, ListItemView) {
	    var CollectionView = Backbone.View.extend({
	        model: BookModel,
	        isFavorite: undefined,
	        views: [],

	        addModel: function(model, collection, options) {
	        },

	        loadUp: function() {
	        	var that = this
	        	if (this.collection.thereIsMore()) {
	        		this.collection.loadMore()
	            	this.collection.fetch({
	            		success: function(collection, response) {
	            			// console.log(collection)
	            			// console.log(response)
	            			that.render()
	            			// that.addViews(response.results)
	            		}
	            	})
				}
	        },

	        addView: function(model) {
	        	console.log('addView')
            	this.views.push(new ListItemView({
					model: model
				}))
	            this.$el.append(this.views[this.views.length - 1].render().el)
	        },

	        render: function() {
	        	this.$el.empty()
	        	this.removeChildViews()
	            for (var i = 0; i < this.collection.length; i++) {
	            	this.views.push(new ListItemView({
						model: this.collection.at(i)
					}))
	                this.$el.append(this.views[i].render().el)
				}
	            return this
	        },

	        initialize: function(options) {
	        	options = options ? options : {}
	        	// this.isFavorite = options.isFavorite ? options.isFavorite : function() {return false}
	            this.collection = options.collection ? options.collection : new BooksCollection()
	            var that = this

	            this.collection.fetch({
	                success: function(response) {
	                    that.render()
	                },
	                error: function(e) {
	                	console.log('error ' + e)
	                }
	            })

	            // this.listenTo(this.collection, 'add', this.addView)
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
