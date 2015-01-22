define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/answers/collections/answers',
		'modules/answers/views/pagedlist',
		'modules/utils/containerview'
	],
	function($, _, Backbone, Url, Collection, ListView, ContainerView) {
	    var FramedView = ContainerView.extend({
	        initialize: function(options) {
	        	options = options || {}
				var listType = options.listType ? options.listType : 'answers'
	        	
	        	var collection = options.collection ||
					        	new Collection([], {
					        		questionId: options.questionId
					        	})

	        	var list = new ListView({collection: collection, listType: listType})

	        	var endView = Backbone.View.extend({
	        		template: $('#template-list-loading').html(),
	        		show: true,

	        		render: function() {
	        			if (this.show) {
	        				this.$el.html(_.template(this.template)())
	        			} else {
	        				this.$el.empty()
	        			}
	        			return this
	        		},

	        		initialize: function() {
	        			var that = this
						this.listenTo(Backbone, 'list:loaded', function(which) {
							console.log('list:loaded ' + which)
							if (which === listType) {
								that.show = false
								that.render()
							}
						})
	        		}
	        	})
	        	var end = new endView()

				ContainerView.prototype.initialize.call(this, [list, end])
	        }
	    })
	
		return FramedView
	}
)
