define([
    'jquery',
    'underscore',
    'backbone'
  ],
  function($, _, Backbone) {
    var StaticView = Backbone.View.extend({
      render: function() {
        // var html = _.template(this.template)()
        var html = this.template()
        wthis.$el.html(html)
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
