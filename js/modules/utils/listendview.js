define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/list-loading.html',
    'text!/templates/list-end.html',
    'i18n!modules/nls/loading'
  ],
  function($, _, Backbone, Template, TemplateEnd, i18n) {
    var endView = Backbone.View.extend({
      show: true,

      render: function() {
        if (this.show) {
          this.$el.html(_.template(Template)(i18n))
        } else {
          this.$el.empty().html(TemplateEnd)
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

