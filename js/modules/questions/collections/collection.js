define([
		'jquery',
		'underscore',
		'backbone',
		'modules/questions/models/question',
		'url'
	],
	function($, _, Backbone, QuestionModel, Url) {
	    var QuestionsCollection = Backbone.Collection.extend({
	        model: QuestionModel,
	        url: function() {
	        	return Url('questions')
	        },
	        // url: '../../api/books.json',

	        parse: function(what) {
	            return what
	        }
	    })

	    return QuestionsCollection
	}
)
