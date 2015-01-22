define([
		'jquery',
		'underscore',
		'backbone',
		'modules/menu/models/item'
	],
	function($, _, Backbone, MenuItem) {
		var MenuItemView = Backbone.View.extend({
			tagName: 'div',
			menu: '',

			attributes: function() {
				return {
					style: 'display: inline-block',
				}
			},

			render: function() {
				var html = '<a id="<%=id%>" class="<%= classes %>" href="<%= href %>" > <%= title %> </a>'
				var text = this.model.get('title')

				
				//to be FIXED !!!!
				if (!this.model.get('full')) {
					text = text.slice(0, 40) + (text.length > 40 ? '..."' : '')
				}
				
				this.$el.html(_.template(html)({
					'title': text, 
					'href': this.model.get('path'), 
					'id': this.model.collection.menu + '-menu-' + this.model.get('page'),
					'classes': 'menu-item' + (this.classes ? ' ' + this.classes : '')
				}))
				return this
			},

			activateMenu: function(options) {
				var that = this
				// console.log('activate menu', options, this.model)
				if (options.menu != this.model.collection.menu) return
				// console.log('activate menu PASS ', options.menu)

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
				if (options.classes) this.classes = options.classes
				if (options.menu) this.menu = options.menu

				this.listenTo(Backbone, 'menu:activate', this.activateMenu)
				// this.listenTo(this.model, 'change', this.render)
			}
		})

		return MenuItemView
	}
)
