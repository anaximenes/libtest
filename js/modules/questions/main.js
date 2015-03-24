define([
    'jquery',
    'underscore',
    'backbone',
    // 'modules/questions/views/list',
    'modules/utils/url',
    'modules/questions/views/pagedlist',
    'modules/questions/views/card',
    'modules/questions/views/framedlist',
    'modules/questions/views/questionpage',
    'modules/questions/collections/pagedcollection',
    'modules/questions/models/question'
  ],
  function($, _, Backbone, Url, PagedListView, CardView, FramedListView, QuestionPageView, PagedCollection, QuestionModel) {
    var saved = {};
    saved.models = {};
    saved.collections = {};

    var getAllView = function() {
      saved.collections.all = saved.collections.all || new PagedCollection();
      return new FramedListView({ collection: saved.collections.all });
    }

    var getSearchView = function(query) {
      return new FramedListView({
        collection: new PagedCollection([], {
          url: function() {
            return Url('questionsSearch', query);
          }
        })
      });
    }

    var getQuestionPageView = function(questionId, bottom) {
      saved.models[questionId] = saved.models[questionId] || new QuestionModel({ id: questionId })
      return new QuestionPageView(saved.models[questionId], bottom)
    }

    return {
      'PagedListView':     PagedListView,
      'CardView':          CardView,
      'FramedListView':    FramedListView,
      'QuestionPageView':  QuestionPageView,
      'PagedCollection':   PagedCollection,
      'Model':             QuestionModel,

      'getAllView':           getAllView,
      'getSearchView':        getSearchView,
      'getQuestionPageView':  getQuestionPageView,
      'saved':                saved
    }
  }
)
