define([
		'jquery',
		'underscore',
		'backbone',
		'modules/user/models/user'
	],
	function($, _, Backbone, Model) {
	    SignInView = Backbone.View.extend({
	    	el: $('#page-nickname').html(),

	        events: {
	        	'submit': 'signin'
	        },

	        render: function() {
	            html = '' this.model.nickname
	            this.$el.html(html)
	            return this
	        },

	        initialize: function() {
	        }
	    })

	    return SignInView
	}
)
