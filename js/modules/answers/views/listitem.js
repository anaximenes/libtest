define([
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {
	    ListItemView = Backbone.View.extend({
	        template: $('#template-questions-list-entry').html(),
	        // templateLoading: $('#template-book-entry-loading').html(),

	        render: function() {
	        	var html = undefined
	            html = _.template(this.template)(this.model.toJSON())
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

