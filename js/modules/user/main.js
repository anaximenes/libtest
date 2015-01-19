define([
		'jquery',
		'underscore',
		'backbone',
		'modules/user/models/auth',
		'modules/user/views/signin'
		// 'modules/user/views/',
	],
	function($, _, Backbone, UserModel, SignInView) {
		return {
			AuthModel: UserModel,
			signinView: SignInView
		}
	}
)
