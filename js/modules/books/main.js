define([
		'jquery',
		'underscore',
		'backbone',
		// 'modules/books/views/list',
		'modules/books/views/pagedlist',
		'modules/books/views/card',
		'modules/books/collections/pagedcollection',
		'modules/books/models/book'
	],
	function($, _, Backbone, ListView, CardView, PagedCollection, BookModel) {
		return {
			'PagedListView':     ListView, 
			'CardView':          CardView,
			'PagedCollection':   PagedCollection,
			'Model':             BookModel
		}
	}
)
