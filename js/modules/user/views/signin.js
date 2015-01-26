define([
		'jquery',
		'underscore',
		'backbone',
		'modules/user/models/auth'
	],
	function($, _, Backbone, Model) {
	    SignInView = Backbone.View.extend({
	        template: $('#template-signin').html(),

	        events: {
	        	'submit': 'signin'
	        },

	        signin: function() {
	        	event.preventDefault()
	        	Backbone.trigger('user:signin', {
		        	email: this.$el.find('#inputEmail').val(),
					password: this.$el.find('#inputPassword').val()
				})
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
