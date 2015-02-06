define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url'
  ],
  function($, _, Backbone, Url) {
    var QuestionModel = Backbone.Model.extend({
      url: function() {
        return Url('question', this.id)
      },

      properties: [
        'id',
        'user'
      ],

      complete: function() {
        var that = this
        return this.properties.reduce(function(prev, cur) {
          return (prev && (that.get(cur) != undefined))
        }, true)
      },

      present: function() {
        var copy = this.clone()
        copy.set('body', this.get('converter').makeHtml(copy.get('body')))
        copy.set('title', this.get('converter').makeHtml(copy.get('title')))
        return copy.toJSON()
      },

      initialize: function() {
        this.set('converter', new Markdown.getSanitizingConverter())
      }
    })

    return QuestionModel
  }
)
