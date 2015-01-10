define([
		'jquery',
		'underscore',
		'backbone',
		'modules/books/views/list',
		'modules/books/views/card',
		'modules/books/models/book'
	],
	function($, _, Backbone, ListView, CardView, BookModel) {
		return {
			'ListView': ListView, 
			'CardView': CardView,
			'Model': BookModel
		}
	}
)
