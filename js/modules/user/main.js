define([
    'jquery',
    'underscore',
    'backbone',
    'modules/user/models/auth',
    'modules/user/views/signin',
    'modules/user/views/signup',
    'modules/user/models/user',
    'modules/user/views/headerview',
    'modules/user/models/bookedit'
  ],
  function($, _, Backbone, UserModel, SignInView, SignUpView, User, HeaderView, BookEdit) {
    return {
      AuthModel: UserModel,
      signinView: SignInView,
      signupView: SignUpView,
      model: User,

      init: function(user) {
        new HeaderView({model: user})
        new BookEdit()
      }
    }
  }
)
