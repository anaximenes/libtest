define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone) {
    var BackStrip = Backbone.View.extend({
      el: '#button-back',

      events: {
        'click': 'click'
      },

      click: function() {
        Backbone.trigger('backstrip')
      }
    })

    return {init: }
  }
)