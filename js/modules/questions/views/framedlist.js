define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/questions/collections/pagedcollection',
		'modules/questions/views/pagedlist',
		'modules/utils/framedlistview'
	],
	function($, _, Backbone, Url, Collection, ListView, BaseFramedView) {
	    var FramedView = BaseFramedView.extend({
	        initialize: function(options) {
	        	this.Collection = Collection
	        	this.ListView = ListView
	        	this.url = function() {
	        		return Url('questions')
	        	}

	        	BaseFramedView.prototype.initialize.call(this, options)
	        }
	    })
	
		return FramedView
	}
)
