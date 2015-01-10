define([
		'jquery',
		'underscore',
		'backbone',
		'modules/questions/models/question',
		'modules/questions/collections/collection',
		'modules/questions/views/listitem'
	],
	function($, _, Backbone, QuestionModel, QuestionsCollection, ListItemView) {
	    var CollectionView = Backbone.View.extend({
	        model: QuestionModel,
	        views: [],

	        render: function() {
	            for (var i = 0; i < this.views.length; i++) {
	                this.$el.append(this.views[i].render().el)
	            }
	            return this
	        },

	        initialize: function() {
	            var collection = new QuestionsCollection()
	            var that = this
	            collection.fetch({
	                success: function(response) {
	                    _.each(response.models, function(model) {
	                        that.views.push(new ListItemView({model: model}))
	                    })
	                    that.render()
	                },
	                error: function(e) {
	                }
	            })
	        },

	        remove: function() {
	        	for (var i = this.views.length - 1; i>= 0; --i) {
	        		this.views[i].remove()
	        		this.views.pop()
	        	}
	        	Backbone.View.prototype.remove.call(this);
	        }
	    })
	
		return CollectionView
	}
)
