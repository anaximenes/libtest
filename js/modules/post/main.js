define([
    'jquery',
    'underscore',
    'backbone',
    'modules/post/views/userpost',
    'modules/post/views/answerpost',
    'modules/post/views/bookedit'
  ],
  function($, _, Backbone, UserPost, AnswerPost, BookEdit) {
    return {
      'UserPostView':    UserPost,
      'AnswerPostView':  AnswerPost,
      'PlainView':       BookEdit,
    }
  }
)
