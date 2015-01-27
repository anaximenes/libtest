define([
    'jquery',
    'underscore',
    'backbone',
    // 'modules/answers/views/pagedlist',
    // 'modules/answers/views/card',
    'modules/answers/views/framedlist',
    'modules/answers/collections/answers',
    'modules/answers/models/answer'
  ],
  function($, _, Backbone, FramedListView, PagedCollection, Model) {
    return {
      // 'PagedListView':     ListView,
      // 'CardView':          CardView,
      'FramedListView':    FramedListView,
      'PagedCollection':   PagedCollection,
      'Model':             Model
    }
  }
)
