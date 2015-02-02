define([
    'jquery',
    'underscore',
    'backbone',
    'modules/post/views/userpost',
    'modules/post/views/plainpost'
  ],
  function($, _, Backbone, UserPost, PlainPost) {
    return {
      'UserPostView':  UserPost,
      'PlainView':     PlainPost,
    }
  }
)
