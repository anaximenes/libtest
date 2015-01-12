define([
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {
	    SignInView = Backbone.View.extend({
	        template: $('#template-signin').html(),

	        events: {
	        	'click #signin-button': 'signin'
	        },

	        signin: function() {
	        	Backbone.trigger('signin:success', 30479)
	        },

	        render: function() {
	            html = _.template(this.template)()
	            this.$el.html(html)
	            return this
	        },

	        initialize: function() {
	        }
	    })

	    return SignInView
	}
)
