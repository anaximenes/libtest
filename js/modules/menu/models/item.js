define([
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {
		var Map = {
			'books': {
				id: 1,
				name: 'Books', 
				path: '#!/books/'
			},
			'questions': {
				id: 2,
				name: 'Questions', 
				path: '#!/questions/'
			},
			'favorites': {
				id: 3,
				name: 'Favorites',
				path: '#!/favorites/'
			},
			'comments': {
				id: 4,
				name: 'Comments',
				path: '#'
			},
			'reviews': {
				id: 6,
				name: 'Reviews',
				path: '#'
			},
			'postComment': {
				id: 7,
				name: 'Post',
				path: '#'
			},
			'answers': {
				id: 8,
				name: 'Answers',
				path: '#'
			},
			'postAnswer': {
				id: 9,
				name: 'Post',
				path: '#'
			},
			'add': {
				id: 101,
				path: '#'
			}
		}

	    var Model = Backbone.Model.extend({
	    	initialize: function(options) {
	    		var name = options.name
	    		this.set('page', name)
	    		this.set('id', Map[name].id)
	    		options.title ? this.set('name', options.title) : this.set('name', Map[name].name)
	    		options.path ? this.set('href', options.path) : this.set('href', Map[name].path)
	    	}
	    })

	    return Model
	}
)
