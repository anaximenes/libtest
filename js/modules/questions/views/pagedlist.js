define([
    'jquery',
    'underscore',
    'backbone',
    'modules/questions/models/question',
    'modules/questions/collections/pagedcollection',
    'modules/questions/views/listitem',
    'modules/pageable/views/list'
  ],
  function($, _, Backbone, QuestionModel, QuestionsCollection, ListItemView, BaseCollectionView) {
    var CollectionView = BaseCollectionView.extend({
      model: QuestionModel,

      initialize: function(options) {
        BaseCollectionView.prototype.initialize.apply(this, [options])
        this.ItemView = ListItemView
        options = options ? options : {}
        this.collection = options.collection ? options.collection : new QuestionsCollection()
      }
    })
  
    return CollectionView
  }
)
