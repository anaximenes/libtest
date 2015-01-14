define([
	'jquery',
	'underscore',
	'backbone'
	], function($, _, Backbone) {
		var BackStrip = {};

		var $el = $('#button-back')

		_.extend(BackStrip, Backbone.Events)

		BackStrip.trackScrolling = function() {
			$(window).on('scroll', _.throttle(
				function(event) {
					var body = document.body;
					// $el.css('top', body.scrollTop)
					$el.css('height', body.scrollHeight)
					if (body.scrollTop < window.innerHeight) {
						$el.hide()
					} else {
						$el.show()
					}
					// if (body.scrollTop)
					// var threshold = body.scrollHeight - window.innerHeight - tolerance;
					// if (body.scrollTop > threshold) {
					// 	Backbone.trigger('page:scrollbottom');
					// }
				}, 100)
			);
		}

		BackStrip.trackClick = function() {
			$el.bind('click', function() {
				Backbone.trigger('backstrip')
			})
		}

		// Run this module by calling initialize().
		BackStrip.initialize = function() {
			// $el.css('top', $('#page').position().top)
			this.trackScrolling();
			this.trackClick();
		}		
		
		return BackStrip
	}
)
