define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/views/pagedlist',
		'modules/books/views/card',
		'modules/books/views/framedlist',
		// 'modules/books/views/bookpage',
		'modules/books/collections/pagedcollection',
		'modules/books/models/book'
	],
	// function($, _, Backbone, ListView, CardView, BookPageView, PagedCollection, BookModel) {
	function($, _, Backbone, ListView, CardView, FramedListView, PagedCollection, BookModel) {
		return {
			'PagedListView':     ListView, 
			'CardView':          CardView,
			'FramedListView':    FramedListView,
			// 'BookPageView':      BookPageView,
			'PagedCollection':   PagedCollection,
			'Model':             BookModel
		}
	}
)
