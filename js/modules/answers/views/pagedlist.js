define([
    'jquery',
    'underscore',
    'backbone',
    'modules/answers/models/answer',
    'modules/answers/collections/answers',
    'modules/answers/views/listitem',
    'modules/pageable/views/list'
  ],
  function($, _, Backbone, Model, Collection, ListItemView, BaseCollectionView) {
    var CollectionView = BaseCollectionView.extend({
      model: Model,

      initialize: function(options) {
        this.ItemView = ListItemView
        options = options ? options : {}
        this.collection = options.collection ? options.collection : new Collection()

        BaseCollectionView.prototype.initialize.apply(this, [options])
      }
    })

    return CollectionView
  }
)
