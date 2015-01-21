define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/pageable/collections/collection',
		'modules/reviews/models/review'
	],
	function($, _, Backbone, Url, BasePagedCollection, Model) {
	    var PagedCollection = BasePagedCollection.extend({
	        model: Model,
	        // url: function() {
	        // 	return Url('books')
	        // },

	        initialize: function(models, options) {
	        	BasePagedCollection.prototype.initialize.apply(this, [models, options])
	        	options = options || {}
	            if (options.url) {
	            	this.url = options.url	
	            }
	        }
	    })

	    return PagedCollection
	}
)
