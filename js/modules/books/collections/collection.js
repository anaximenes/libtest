define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/models/book',
		'url'
	],
	function($, _, Backbone, BookModel, Url) {
	    var BooksCollection = Backbone.Collection.extend({
	        model: BookModel,
	        url: function() {
	        	return Url('books')
	        },
	        // url: '../../api/books.json',

	        parse: function(response, options) {
	            return response.results
	        }
	    })

	    return BooksCollection
	}
)
