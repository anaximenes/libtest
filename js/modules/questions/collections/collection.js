define([
		'jquery',
		'underscore',
		'backbone',
		'modules/questions/models/question',
		'modules/utils/url'
	],
	function($, _, Backbone, QuestionModel, Url) {
	    var QuestionsCollection = Backbone.Collection.extend({
	        model: QuestionModel,
	        url: function() {
	        	return Url('questions')
	        },

	        parse: function(response) {
	            return response.results
	        }
	    })

	    return QuestionsCollection
	}
)
