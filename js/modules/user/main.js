define([
    'jquery',
    'underscore',
    'backbone',
    'modules/user/models/auth',
    'modules/user/views/signin',
    'modules/user/models/user',
    'modules/user/views/nickname',
    'modules/user/views/headerview'
    // 'modules/user/views/',
  ],
  function($, _, Backbone, UserModel, SignInView, User, NickNameView, HeaderView) {
    return {
      AuthModel: UserModel,
      signinView: SignInView,
      model: User,
      // view: View,

      init: function(user) {
        new HeaderView({model: user})
        new NickNameView({model: user})
      }
    }
  }
)
