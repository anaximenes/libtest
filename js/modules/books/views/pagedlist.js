define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/models/book',
		'modules/books/collections/pagedcollection',
		'modules/books/views/listitem',
		'modules/pageable/views/list'
	],
	function($, _, Backbone, BookModel, BooksCollection, ListItemView, BaseCollectionView) {
	    var CollectionView = BaseCollectionView.extend({
	        model: BookModel,

	        initialize: function(options) {
				BaseCollectionView.prototype.initialize.apply(this, [options])
	        	this.ItemView = ListItemView
	        	options = options ? options : {}
	            this.collection = options.collection ? options.collection : new BooksCollection()
	        }
	    })
	
		return CollectionView
	}
)
