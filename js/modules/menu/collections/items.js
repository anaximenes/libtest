define([
		'jquery',
		'underscore',
		'backbone',
		'modules/menu/models/item'
	],
	function($, _, Backbone, MenuItem) {
		var allowed = new Set([
			'books', 'questions', 'favorites', 'comments', 'add', 'recent', 'all', 'edit', 'description'
		])

	    var Collection = Backbone.Collection.extend({
	        model: MenuItem,
	        menu: '',

	        initialize: function(models, options) {
	        	// this.models = options.models || []
	        	this.menu = options.menu
	        	this.models = models
	        	var that = this

	        	this.listenTo(Backbone, 'controller:transition', function(options) {
	        		if (this.menu != options.menu) return
	        		var page = options.page
	        		if (allowed.has(page)) {
	        			// console.log('transition: ' + page)
		        		that.add(new MenuItem({page: page}), {merge: true})
		        		Backbone.trigger('menu:activate', {menu: this.menu, page: page})
		        		// console.log('menu:activate ', {menu: this.menu, page: page})
		        	}
	        	})

	        	this.listenTo(Backbone, 'menu:additional', function(params) {
	        		if (this.menu != params.menu) return

	        		for (var i = 0; i < that.models.length; ++i) {
	        			if (that.models[i].id === 101) {
	        				that.add(new MenuItem({page: 'add', title: '"' + params.model.get('title') + '"', path: params.path}), {merge: true}, {at: i})
	        			}
	        		}
	        		that.add(new MenuItem({page: 'add', title: '"' + params.model.get('title') + '"', path: params.path}), {merge: true})
	        		that.trigger('add')
	        		Backbone.trigger('menu:activate', {menu: this.menu, page: 'add'})
	        	})

	        	this.listenTo(Backbone, 'signin:success', function(options) {
	        		if (this.menu != 'sub-header') return
	        			
	        		that.add(new MenuItem({page: 'favorites'}), {merge: true})
	        	})

	        	this.listenTo(Backbone, 'signout', function(options) {
	        		if (this.menu != 'header') return

	        		that.remove(new MenuItem({page: 'favorites'}), {merge: true})
	        	})
	        }
	    })

	    return Collection
	}
)
