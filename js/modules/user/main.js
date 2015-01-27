define([
    'jquery',
    'underscore',
    'backbone',
    'modules/user/models/auth',
    'modules/user/views/signin',
    'modules/user/models/user',
    'modules/user/views/nickname'
    // 'modules/user/views/',
  ],
  function($, _, Backbone, UserModel, SignInView, User, View) {
    return {
      AuthModel: UserModel,
      signinView: SignInView,
      model: User,
      view: View
    }
  }
)
