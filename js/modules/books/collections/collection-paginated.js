define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/models/book',
		'modules/utils/url',
		'modules/utils/pageablecollection'
	],
	function($, _, Backbone, BookModel, Url, PaginatedCollection) {
	    var BooksCollection = PaginatedCollection.extend({
	        model: BookModel,
	        // url: function() {
	        	// return Url('favorites', 30479)
	        	// return Url('books')
	        // },

	        initialize: function(models, options) {
	        	this.models = models
	        	options = options || {}
	            this.url = options.url ? options.url : undefined
	        }
	    })

	    return BooksCollection
	}
)
