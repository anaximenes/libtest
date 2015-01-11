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
	        url: function() {
	        	return Url('books')
	        },
	    })

	    return BooksCollection
	}
)
