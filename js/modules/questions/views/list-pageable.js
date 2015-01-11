define([
		'jquery',
		'underscore',
		'backbone',
		'modules/questions/models/question',
		'modules/questions/collections/collection-paginated',
		'modules/questions/views/listitem'
	],
	function($, _, Backbone, QuestionModel, QuestionsCollection, ListItemView) {
	    var CollectionView = Backbone.View.extend({
	        model: QuestionModel,
	        isFavorite: undefined,
	        views: [],

	        loadUp: function() {
	        	var that = this
	        	if (this.collection.thereIsMore()) {
	        		this.collection.loadMore()
	            	this.collection.fetch({
	            		success: function(response) {
	            			that.render()
	            		}
	            	})
				}
	        },

	        render: function() {
	        	this.$el.empty()
	        	this.removeChildViews()
	            for (var i = 0; i < this.collection.length; i++) {
	            	this.views.push(new ListItemView({
						model: this.collection.at(i)
					}))
	                this.$el.append(this.views[i].render().el)
				}
	            return this
	        },

	        initialize: function(options) {
	        	options = options ? options : {}
	        	// this.isFavorite = options.isFavorite ? options.isFavorite : function() {return false}
	            this.collection = options.collection ? options.collection : new QuestionsCollection()
	            var that = this

	            this.collection.fetch({
	                success: function(response) {
	                    that.render()
	                },
	                error: function(e) {
	                	console.log('error ' + e)
	                }
	            })

	            this.listenTo(Backbone, 'page:scrollbottom', this.loadUp)
	        },

	        removeChildViews: function() {
	        	for (var i = this.views.length - 1; i >= 0; --i) {
	        		this.views[i].remove()
	        		this.views.pop()
	        	}
	        },

	        remove: function() {
	        	this.removeChildViews()
	        	Backbone.View.prototype.remove.call(this);
	        }
	    })
	
		return CollectionView
	}
)
