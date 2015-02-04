define([
    'jquery',
    'underscore',
    'backbone'
  ],
  function($, _, Backbone) {
    var StaticView = Backbone.View.extend({
      render: function() {
        // var html = _.template(this.template)()
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
        this.template = options.template || _.template('')
      }
    })

    return StaticView
  }
)
