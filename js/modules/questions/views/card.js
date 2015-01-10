define([
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {
	    var CardItemView = Backbone.View.extend({
	        template: $('#template-question-card').html(),
	        templateLoading: $('#template-question-entry-loading').html(),

	        render: function() {
	        	var html = undefined
	        	if (this.model.complete()) {
	        		console.log('complete')
		            html = _.template(this.template)(this.model.toJSON())
		         } else {
	        		console.log('not complete')
		            html = _.template(this.templateLoading)(this.model.toJSON())
		         }
	            this.$el.html(html)
	            return this
	        },

	        initialize: function() {
	            this.listenTo(this.model, 'change', this.render)
	        }
	    })

	    return CardItemView
	}
)