require([
		'backbone',
		'app',
		'modules/utils/scrolling'
	], function(Backbone, App, Scrolling) {
		var user = new App.User.model()
		var Router = App.Router.extend({user: user})
		var router = new Router()
		Backbone.history.start({ pushState: false })
		Scrolling.initialize()
	}
)