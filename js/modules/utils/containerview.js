define([
	'jquery',
	'underscore',
	'backbone'
	], 
	function($, _, Backbone) {
		var Container = Backbone.View.extend({

			render: function() {
				for (var i = 0; i < this.views.length; ++i) {
					this.$el.append(this.views[i].render().el)
				}
				return this
			},

			initialize: function(views) {
				this.views = views
			},

			remove: function() {
				for (var i = this.views.length - 1; i >= 0; --i) {
					this.views[i].remove()
					this.views.pop()
				}
				Backbone.View.prototype.remove.call(this)
			}
		})

		return Container
	}
)