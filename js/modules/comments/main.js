define([
    'jquery',
    'underscore',
    'backbone',
    'modules/comments/models/comment',
    'modules/comments/collections/comments',
    'modules/comments/views/listitem',
    'modules/comments/views/list'
  ],
  function($, _, Backbone, Model, Collection, ItemView, ListView) {
    return {
      'Model':       Model,
      'Collection':  Collection,
      'ItemView':    ItemView,
      'ListView':    ListView
    }
  }
)
