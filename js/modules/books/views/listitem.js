define([
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {
	    ListItemView = Backbone.View.extend({
	        template: $('#template-books-list-entry').html(),
	        templateLoading: $('#template-book-entry-loading').html(),

	        events: {
	            // 'click .title, .book-image': 'openBook',
	            'click #favorite-button': 'toggleFavorite'
	        },

	        openBook: function() {
				Backbone.trigger('book:open', this)
	        },

	        toggleFavorite: function() {
	        	var that = this
	        	this.model.set('isFavorite', !this.model.get('isFavorite'))
	        	this.model.save([], {error: function() {
	        		console.error('add to favorites: unathorized!')
	        		that.model.set('isFavorite', !that.model.get('isFavorite'))
	        	}})
				// Backbone.trigger('book:toggleFavorite', this)
	        },

	        render: function() {
	        	var html = undefined
	        	if (this.model.complete()) {
		            html = _.template(this.template)(this.model.toJSON())
		         } else {
		            html = _.template(this.templateLoading)(this.model.toJSON())
		         }
	            this.$el.html(html)
	            return this
	        },

	        initialize: function(options) {
	            this.listenTo(this.model, 'change', this.render)
	        }
	    })

	    return ListItemView
	}
)
