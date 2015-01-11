define([
		'jquery',
		'underscore',
		'backbone',
		'modules/questions/models/question',
		'modules/utils/url',
		'modules/utils/pageablecollection'
	],
	function($, _, Backbone, BookModel, Url, PaginatedCollection) {
	    var BooksCollection = PaginatedCollection.extend({
	        model: BookModel,
	        url: function() {
	        	return Url('questions')
	        },
	    })

	    return BooksCollection
	}
)
