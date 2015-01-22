define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/pageable/collections/collection',
		'modules/answers/models/answer'
	],
	function($, _, Backbone, Url, BasePagedCollection, Model) {
	    var PagedCollection = BasePagedCollection.extend({
	        model: Model,
	        url: function() {
	        	return Url('answers', this.questionId)
	        },

	        initialize: function(models, options) {
	        	BasePagedCollection.prototype.initialize.apply(this, [models, options])
	        	options = options || {}
	            if (options.url) {
	            	this.url = options.url
	            }
	            this.questionId = options.questionId
	        }
	    })

	    return PagedCollection
	}
)
