require([
		'backbone',
		'app',
		'modules/utils/scrolling',
		'modules/utils/backstrip'
	], function(Backbone, App, Scrolling, BackStrip) {
		var user = new App.User.model()
		var Router = App.Router.extend({user: user})
		var router = new Router()
		Backbone.history.start({ pushState: false })
		Scrolling.initialize()
		// BackStrip.initialize()
	}
)