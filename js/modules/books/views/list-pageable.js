define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/models/book',
		'modules/books/collections/collection-paginated',
		'modules/books/views/listitem'
		// 'modules/utils/pageablecollection'
	],
	function($, _, Backbone, BookModel, BooksCollection, ListItemView) {
	    var CollectionView = Backbone.View.extend({
	        model: BookModel,
	        isFavorite: undefined,
	        views: [],

	        loadUp: function() {
	        	var that = this
	        	if (this.collection.thereIsMore) this.collection.currentPage++
            	this.collection.fetch({
            		success: function(response) {
            			that.render()
            		}
            	})
	        },

	        render: function() {
	        	this.$el.empty()
	        	this.removeChildViews()
	            for (var i = 0; i < this.collection.length; i++) {
	            	this.views.push(new ListItemView({
						model: this.collection.at(i), 
						isFavorite: this.isFavorite
					}))
	                this.$el.append(this.views[i].render().el)
				}
	            return this
	        },

	        initialize: function(options) {
	        	options = options ? options : {}
	        	this.isFavorite = options.isFavorite ? options.isFavorite : function() {return false}
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
