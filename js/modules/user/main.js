define([
    'jquery',
    'underscore',
    'backbone',
    'modules/user/models/auth',
    'modules/user/views/signin',
    'modules/user/views/signup',
    'modules/user/models/user',
    'modules/user/views/nickname',
    'modules/user/views/headerview'
    // 'modules/user/views/',
  ],
  function($, _, Backbone, UserModel, SignInView, SignUpView, User, NickNameView, HeaderView) {
    return {
      AuthModel: UserModel,
      signinView: SignInView,
      signupView: SignUpView,
      model: User,
      // view: View,

      init: function(user) {
        new HeaderView({model: user})
        new NickNameView({model: user})
      }
    }
  }
)
