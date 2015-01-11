define([
		'jquery',
		'underscore',
		'backbone',
		'modules/questions/views/list',
		'modules/questions/views/list-pageable',
		'modules/questions/views/card',
		'modules/questions/collections/collection-paginated',
		'modules/questions/models/question'
	],
	function($, _, Backbone, ListView, ListViewPaginated, CardView, PaginatedCollection, QuestionModel) {
	// function($, _, Backbone, ListView, QuestionModel) {
		return {
			'ListView': ListView, 
			'ListViewPaginated': ListViewPaginated, 
			'CardView': CardView,
			'PaginatedCollection': PaginatedCollection,
			'Model': QuestionModel
		}
	}
)
