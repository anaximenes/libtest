define([
		'jquery',
		'underscore',
		'backbone',
		'url'
	],
	function($, _, Backbone, Url) {
	    var QuestionModel = Backbone.Model.extend({
	    	url: function() {
	    		return Url('question', this.id)
	    	},

	    	properties: [
	    		'id',
	    		'author',
	    		'title',
	    		'content'
	    	],

	    	complete: function() {
	    		var that = this
	    		return this.properties.reduce(function(prev, cur) {
	    			return (prev && (that.get(cur) != undefined))
	    		}, true)
	    	}
	    })

	    return QuestionModel
	}
)
