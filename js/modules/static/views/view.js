define([
    'jquery',
    'underscore',
    'backbone'
  ],
  function($, _, Backbone) {
    var StaticView = Backbone.View.extend({
      // template: $('#template-post').html(),

      render: function() {
        var html = _.template(this.template)()
        this.$el.html(html)
        return this
      },

      initialize: function(options) {
        options || (options = {})
        this.template = options.template || ''
      }
    })

      return StaticView
  }
)
