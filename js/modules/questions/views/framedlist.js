define([
		'jquery',
		'underscore',
		'backbone',
		'modules/utils/url',
		'modules/questions/collections/pagedcollection',
		'modules/questions/views/pagedlist',
		'modules/utils/containerview'
	],
	function($, _, Backbone, Url, Collection, ListView, ContainerView) {
	    var FramedView = ContainerView.extend({
	        initialize: function(options) {
	        	options = options || {}
	        	var collection = options.collection ||
					        	new Collection([], {
					        		url: function() {
					        			return Url('questions')
					        		}
					        	})
	        	var list = new ListView({collection: collection, listType: 'questions'})

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
							if (which === 'questions') {
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
