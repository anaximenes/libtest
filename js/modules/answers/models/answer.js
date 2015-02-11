define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url'
  ],
  function($, _, Backbone, Url) {
    var AnswerModel = Backbone.Model.extend({
      url: function() {
        return Url('answer', this.id)
      },

      properties: [
        'id',
      ],

      complete: function() {
        var that = this
        return this.properties.reduce(function(prev, cur) {
          return prev && (that.get(cur) != undefined)
        }, true)
      }
    })

    return AnswerModel
  }
)
