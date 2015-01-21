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
	        	var model = new Model({
	        		'email': this.$el.find('#inputEmail').val(),
	        		'password': this.$el.find('#inputPassword').val()
	    		})
	    		console.log(model)
				model.save([], {
					success: function(model, response) {
						console.log('signed ', model.id)
	        			Backbone.trigger('user:signin', model.id)
					},
					error: function(e) {
						console.log(e)
					}
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
