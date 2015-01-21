define([
	'jquery',
	'underscore',
	'backbone'
	], function($, _, Backbone) {
		var HeaderView = Backbone.View.extend({
			el: $('#signInHeader'),

			render: function() {
				if (this.userId) {
					$('#page-signup').hide()
					$('#page-signin').hide()
					$('#page-signout').show()
				} else {
					$('#page-signup').show()
					$('#page-signin').show()
					$('#page-signout').hide()
				}
			},

			signIn: function(id) {
				this.userId = id
				this.render()
			},

			initialize: function (options) {
				this.userId = options.userId
				this.render()

				this.listenTo(Backbone, 'user:signed', this.signIn)
				this.listenTo(Backbone, 'signin:success', this.signIn)
				this.listenTo(Backbone, 'signout', this.signIn)
			}
		})

		return HeaderView
	}
)