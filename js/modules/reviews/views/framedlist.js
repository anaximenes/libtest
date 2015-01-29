define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/reviews/collections/pagedcollection',
    'modules/reviews/views/pagedlist',
    'modules/utils/framedlistview'
  ],
  function($, _, Backbone, Url, Collection, ListView, BaseFramedView) {
    var FramedView = BaseFramedView.extend({
      initialize: function(options) {
        this.Collection = Collection
        this.ListView = ListView
        this.url = function() {
          return Url('reviews')
        }

        BaseFramedView.prototype.initialize.call(this, options)
      }
    })

  return FramedView
  }
)
