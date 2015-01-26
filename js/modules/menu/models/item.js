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
			},
			'reviews': {
				id: 6,
				title: 'Reviews',
			},
			'postComment': {
				id: 7,
				title: 'Post',
			},
			'questionAnswers': {
				id: 8,
				title: 'Answers',
			},
			'postAnswer': {
				id: 9,
				title: 'Post',
			},
			'sort': {
				id: 10,
				title: 'sort',
			},
			'all': {
				id: 20,
				title: 'all',
				path: '#!/books/'
			},
			'favorites': {
				id: 21,
				title: 'favorites',
				path: '#!/books/favorites/'
			},
			'description': {
				id: 22,
				title: 'description',
			},
			'edit': {
				id: 23,
				title: 'edit'
			},
			'read': {
				id: 24,
				title: 's',
			},
			'recent': {
				id: 25,
				title: 'recent',
				path: '#!/books/recent/'
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
			},
			'images-toggler': {
				id: 102,
				title: "<i class='fa fa-image fa'>"
			}
		}

	    var Model = Backbone.Model.extend({
	    	initialize: function(options) {
	    		var page = options.page
	    		this.set('page', page)
	    		this.set('id', Map[page].id)
	    		options.title ? this.set('title', options.title) : this.set('title', Map[page].title)
	    		options.path ? this.set('path', options.path) : this.set('path', Map[page].path)
	    		this.set('toRight', options.toRight ? true : false)
	    		this.set('full', options.full ? true : false)
	    	}
	    })

	    return Model
	}
)
