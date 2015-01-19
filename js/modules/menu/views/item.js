define([
		'jquery',
		'underscore',
		'backbone',
		'modules/menu/models/item'
	],
	function($, _, Backbone, MenuItem) {
		var MenuItemView = Backbone.View.extend({
			// model: MenuItem,
			className: 'menu-item',
			tagName: 'a',
			menu: '',

			attributes: function() {
				return {
					'href': this.model.get('href'),
				}
			},
			id: function() {
				return this.model.collection.menu + '-menu-' + this.model.get('page')
			},

			render: function() {
				var text = this.model.get('name')

				//to be FIXED !!!!
				text = text.slice(0, 40) + (text.length > 40 ? '..."' : '')
				
				this.$el.html(text)
				return this
			},

			activateMenu: function(options) {
				var that = this
				console.log('activate menu', options, this.model)
				if (options.menu != this.model.collection.menu) return
				console.log('activate menu', options.menu, this.model.collection.menu)

				if (this.model.get('page') === options.page) {
					setTimeout(function(){
				        $('#' +  that.model.collection.menu + '-menu-' + options.page).addClass('active')
				    }, 10);
				} else {
					setTimeout(function(){
						$('#' + that.model.collection.menu + '-menu-' + that.model.get('page')).removeClass('active')
						// $('.' + this.className + '.active').removeClass('active')
				    }, 10);
				}
			},

			initialize: function(options) {
				var that = this
				options = options || {}
				if (options.className) this.className = options.className
				if (options.menu) this.menu = options.menu

				this.listenTo(Backbone, 'menu:activate', this.activateMenu)
			}
		})

		return MenuItemView
	}
)