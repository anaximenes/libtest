define([
		'jquery',
		'underscore',
		'backbone',
		// 'modules/answers/views/pagedlist',
		// 'modules/answers/views/card',
		'modules/answers/views/framedlist',
		// 'modules/books/views/bookpage',
		'modules/answers/collections/answers',
		'modules/answers/models/answer'
	],
	// function($, _, Backbone, ListView, CardView, BookPageView, PagedCollection, BookModel) {
	function($, _, Backbone, FramedListView, PagedCollection, Model) {
		return {
			// 'PagedListView':     ListView,
			// 'CardView':          CardView,
			'FramedListView':    FramedListView,
			// 'BookPageView':      BookPageView,
			'PagedCollection':   PagedCollection,
			'Model':             Model
		}
	}
)
