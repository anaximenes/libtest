define([
    'jquery',
    'underscore',
    'backbone',
    'modules/user/models/auth',
    'modules/user/views/signin',
    'modules/user/views/signup',
    'modules/user/models/user',
    'modules/user/views/headerview'
  ],
  function($, _, Backbone, UserModel, SignInView, SignUpView, User, HeaderView) {
    return {
      AuthModel: UserModel,
      signinView: SignInView,
      signupView: SignUpView,
      model: User,

      init: function(user) {
        new HeaderView({model: user})
      }
    }
  }
)
