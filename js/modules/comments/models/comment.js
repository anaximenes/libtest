define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url'
	],
	function($, _, Backbone, Url) {
		var Comment = Backbone.Model.extend({
			url: function() {
				return Url('comment', this.id)
			}
		})
		
		return Comment
	}
)
