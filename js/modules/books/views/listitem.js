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
	            'click .title, .book-image': 'openBook',
	            'click #favorite-button': 'toggleFavorite'
	        },

	        openBook: function() {
				Backbone.trigger('book:open', this)
	        },

	        toggleFavorite: function() {
				Backbone.trigger('book:toggleFavorite', this)
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
	        	var that = this
	        	this.model.set('favorite', function() {
	        		return options.isFavorite(that.model.id)
	        	})
	        	
	            this.listenTo(this.model, 'change', this.render)

	            this.listenTo(Backbone, 'book:favorite:changed', function(id) {
	            	if (id === that.model.id) {
		            	console.log('redraw!')
		            	this.render()
		            }
	            })
	        }
	    })

	    return ListItemView
	}
)
