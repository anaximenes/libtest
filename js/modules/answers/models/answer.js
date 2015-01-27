define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url'
  ],
  function($, _, Backbone, Url) {
    var BookModel = Backbone.Model.extend({
      url: function() {
        return Url('answer', this.id)
      },

      favorite: undefined,

      properties: [
        'id',
        // 'description'
      ],

      complete: function() {
        var that = this
        return this.properties.reduce(function(prev, cur) {
          return prev && (that.get(cur) != undefined)
        }, true)
      }
    })

    return BookModel
  }
)
