define([
		'jquery',
		'underscore',
		'backbone',
		'modules/reviews/views/pagedlist',
		'modules/reviews/views/card',
		'modules/reviews/views/framedlist',
		'modules/reviews/collections/pagedcollection',
		'modules/reviews/models/review'
	],
	function($, _, Backbone, ListView, CardView, FramedListView, PagedCollection, Model) {
		return {
			'PagedListView':     ListView, 
			'CardView':          CardView,
			'FramedListView':    FramedListView,
			'PagedCollection':   PagedCollection,
			'Model':             Model
		}
	}
)
