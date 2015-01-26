define([
		'jquery',
		'underscore',
		'backbone',
		'modules/menu/views/menu',
		'modules/menu/collections/items',
		'modules/menu/models/item',
	],
	function($, _, Backbone, MenuView, MenuItems, MenuItem) {
		var Menu = {
			View:  MenuView,
			Items: MenuItems,
			Item:  MenuItem
		}

		Menu.get = function(menu) {
			savedMenu[menu] = savedMenu[menu] || Menu.addMenu()
			return savedMenu[menu]
		}

		return Menu
		
		return {
			'View': MenuView,
			'Items': MenuItems,
			'Item': MenuItem
		}
	}
)
