define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/list-loading.html'
  ],
  function($, _, Backbone, Template) {
    var endView = Backbone.View.extend({
      show: true,

      render: function() {
        if (this.show) {
          this.$el.html(_.template(Template)())
        } else {
          this.$el.empty()
        }
        return this
      },

      initialize: function(options) {
        options || (options = {})
        var that = this
        this.listenTo(options.collection, 'loaded', function() {
          that.show = false
          that.render()
        })
        this.show = !options.collection.isOnLastPage()
      }
    })

    return endView
  }
)

