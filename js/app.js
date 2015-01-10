define([
		'jquery',
		'underscore',
		'backbone',
		'modules/user/main',
		'router'
	],
	function($, _, Backbone, User, Router) {
		var app = {}
		app.User = User
		app.Router = Router

		return app
	}
);