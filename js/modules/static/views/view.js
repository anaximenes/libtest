define([
    'jquery',
    'underscore',
    'backbone'
  ],
  function($, _, Backbone) {
    var StaticView = Backbone.View.extend({
      template: '',

      render: function() {
        var html
        if (typeof(this.template) === 'function') {
          html = this.template()
        } else {
          html = this.template
        }
        this.$el.html(html)
        return this
      },

      initialize: function(options) {
        options || (options = {})
        if (options.template) this.template = options.template
      }
    })

    return StaticView
  }
)
