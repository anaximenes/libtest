define([
		'jquery',
		'underscore',
		'backbone',
		// 'modules/questions/views/list',
		'modules/questions/views/pagedlist',
		'modules/questions/views/card',
		'modules/questions/collections/pagedcollection',
		'modules/questions/models/question'
	],
	function($, _, Backbone, PagedListView, CardView, PagedCollection, QuestionModel) {
		return {
			// 'ListView': ListView,
			'PagedListView':     PagedListView,
			'CardView':          CardView,
			'PagedCollection':   PagedCollection,
			'Model':             QuestionModel
		}
	}
)
