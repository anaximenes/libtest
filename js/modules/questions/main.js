define([
		'jquery',
		'underscore',
		'backbone',
		'modules/questions/views/list',
		'modules/questions/views/card',
		'modules/questions/models/question'
	],
	function($, _, Backbone, ListView, CardView, QuestionModel) {
	// function($, _, Backbone, ListView, QuestionModel) {
		return {
			'ListView': ListView, 
			'CardView': CardView,
			'Model': QuestionModel
		}
	}
)
