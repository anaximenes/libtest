define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/pageable/collections/collection',
    'modules/comments/models/comment'
  ],
  function($, _, Backbone, Url, PagedCollection, CommentModel) {
    var Comments = PagedCollection.extend({
      model: CommentModel,
      // url: function() {
      //  return Url('comments')
      // }
      initialize: function(models, options) {
        PagedCollection.prototype.initialize.apply(this, [models, options])
        options = options || {}
        if (options.url) this.url = options.url
      }
    })
    
    return Comments
  }
)
