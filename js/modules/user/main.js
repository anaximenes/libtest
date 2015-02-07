define([
    'jquery',
    'underscore',
    'backbone',
    'modules/user/models/auth',
    'modules/user/views/signin',
    'modules/user/views/signup',
    'modules/user/views/profile',
    'modules/user/models/user',
    'modules/user/models/userdata',
    'modules/user/views/headerview'
  ],
  function($, _, Backbone, UserModel, SignInView, SignUpView, ProfileView, User, UserData, HeaderView) {
    return {
      AuthModel: UserModel,
      signinView: SignInView,
      signupView: SignUpView,
      ProfileView: ProfileView,
      model: User,
      DataModel: UserData,

      init: function(user) {
        new HeaderView({model: user})
      }
    }
  }
)
