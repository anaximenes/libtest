define([
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {
		var Map = {
			'books': {
				id: 1,
				title: 'Books', 
				path: '#!/books/'
			},
			'questions': {
				id: 2,
				title: 'Questions', 
				path: '#!/questions/'
			},
			// 'favorites': {
			// 	id: 3,
			// 	title: 'Favorites',
			// 	path: '#!/favorites/'
			// },
			'comments': {
				id: 4,
				title: 'Comments',
				path: '#'
			},
			'reviews': {
				id: 6,
				title: 'Reviews',
				path: '#'
			},
			'postComment': {
				id: 7,
				title: 'Post',
				path: '#'
			},
			'answers': {
				id: 8,
				title: 'Answers',
				path: '#'
			},
			'postAnswer': {
				id: 9,
				title: 'Post',
				path: '#'
			},
			'sort': {
				id: 10,
				title: 'sort',
				path: '#'
			},
			'all': {
				id: 20,
				title: 'all',
				path: '#'
			},
			'favorites': {
				id: 21,
				title: 'favorites',
				path: '#'
			},
			'description': {
				id: 22,
				title: 'description',
				path: '#'
			},
			'edit': {
				id: 23,
				title: 'edit',
				path: '#'
			},
			'recent': {
				id: 22,
				title: 'recent',
				path: '#'
			},
			'bookQuestions': {
				id: 30,
				title: 'Questions',
			},
			'bookReviews': {
				id: 31,
				title: 'Reviews', 
			},
			'add': {
				id: 101,
				path: '#'
			},
			'images-toggler': {
				id: 102,
				title: "<i class='fa fa-image fa'>"
			}
		}

	    // var Model = Backbone.Model.extend({
	    // 	active: false,

	    // 	initialize: function(options) {
	    // 		options = options || {}
	    // 		this.set('title', options.title || 'default page')
	    // 		this.set('path', options.path || '#!/')
	    // 	}
	    // })
	    var Model = Backbone.Model.extend({
	    	initialize: function(options) {
	    		var page = options.page
	    		this.set('page', page)
	    		this.set('id', Map[page].id)
	    		options.title ? this.set('title', options.title) : this.set('title', Map[page].title)
	    		options.path ? this.set('path', options.path) : this.set('path', Map[page].path)
	    		this.set('toRight', options.toRight ? true : false)
	    	}
	    })

	    return Model
	}
)
