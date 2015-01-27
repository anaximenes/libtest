define([
    'jquery',
    'underscore',
    'backbone',
    // 'modules/questions/views/list',
    'modules/questions/views/pagedlist',
    'modules/questions/views/card',
    'modules/questions/views/framedlist',
    'modules/questions/collections/pagedcollection',
    'modules/questions/models/question'
  ],
  function($, _, Backbone, PagedListView, CardView, FramedListView, PagedCollection, QuestionModel) {
    return {
      // 'ListView': ListView,
      'PagedListView':     PagedListView,
      'CardView':          CardView,
      'FramedListView':    FramedListView,
      'PagedCollection':   PagedCollection,
      'Model':             QuestionModel
    }
  }
)
