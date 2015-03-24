define([
    'jquery',
    'underscore',
    'backbone',
    'modules/feedback/views/feedback-btn',
    'modules/feedback/views/feedback-form',
  ],
  function($, _, Backbone, FeedbackBtn, FeedbackForm) {
    return {
      'ButtonView': FeedbackBtn,
      'FormView': FeedbackForm 
    }
  }
)
