define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/views/list',
		'modules/books/views/list-pageable',
		'modules/books/views/card',
		'modules/books/collections/collection-paginated',
		'modules/books/models/book'
	],
	function($, _, Backbone, ListView, ListViewPaginated, CardView, PaginatedCollection, BookModel) {
		return {
			'ListView': ListView, 
			'ListViewPaginated': ListViewPaginated, 
			'CardView': CardView,
			'PaginatedCollection': PaginatedCollection,
			'Model': BookModel
		}
	}
)
