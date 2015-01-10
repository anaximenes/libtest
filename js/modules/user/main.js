define([
		'jquery',
		'underscore',
		'backbone',
		'modules/user/models/user',
		'modules/user/views/signin'
		// 'modules/user/views/',
	],
	function($, _, Backbone, UserModel, SignInView) {
		return {
			model: UserModel,
			signinView: SignInView
		}
	}
)
