require(['backbone', 'app'], function(Backbone, App) {
	var user = new App.User.model()
	var Router = App.Router.extend({user: user})
	var router = new Router()
	Backbone.history.start({ pushState: false })
	// router.navigate('!/books/', true)
})