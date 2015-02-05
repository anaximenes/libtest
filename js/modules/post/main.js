define([
    'jquery',
    'underscore',
    'backbone',
    'modules/post/views/userpost',
    'modules/post/views/bookedit'
  ],
  function($, _, Backbone, UserPost, BookEdit) {
    return {
      'UserPostView':  UserPost,
      'PlainView':     BookEdit,
    }
  }
)
