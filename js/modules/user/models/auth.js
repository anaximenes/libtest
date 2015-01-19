define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url'
	],
	function($, _, Backbone, Url) {
		var Model = Backbone.Model.extend({
			url: function() {
				return Url('signin')
			}
		})

		return Model
	}
)
