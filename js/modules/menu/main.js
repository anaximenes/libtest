define([
		'jquery',
		'underscore',
		'backbone',
		'modules/menu/views/menu',
		'modules/menu/collections/items',
		'modules/menu/models/item',
	],
	// function($, _, Backbone, ListView, CardView, BookPageView, PagedCollection, BookModel) {
	function($, _, Backbone, MenuView, MenuItems, MenuItem) {
		return {
			'View': MenuView,
			'Items': MenuItems,
			'Item': MenuItem
		}
	}
)
