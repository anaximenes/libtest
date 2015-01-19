define([
		'jquery',
		'underscore',
		'backbone',
		'modules/menu/views/item'
	],
	function($, _, Backbone, ItemView) {
		var MenuView = Backbone.View.extend({
			className: 'container menu',

			render: function() {
				//console.log('... ' + this.className)
				this.$el.empty()
				for (var i = 0; i < this.collection.length; ++i) {
					var view = new ItemView({
						'model': this.collection.at(i),
						className: this.collection.menu + '-menu-item'
					})
					this.$el.append(view.render().el)
				}
				this.$el.append('<hr>')
				return this
			},

			initialize: function(options) {
				options = options || {}
				this.collection = options.collection

				this.listenTo(this.collection, 'add remove reset', this.render)
				this.listenTo(Backbone, 'page:rendered', function() {
					Backbone.trigger()
				})
			}
		})

		return MenuView
	}
)