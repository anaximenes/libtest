define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/reviews/collections/pagedcollection',
    'modules/reviews/views/pagedlist',
    'modules/utils/containerview'
  ],
  function($, _, Backbone, Url, Collection, ListView, ContainerView) {
    var FramedView = ContainerView.extend({
      initialize: function(options) {
        options = options || {}
        var listType = options.listType ? options.listType : 'reviews'
            
        var collection = options.collection || new Collection()
        var list = new ListView({collection: collection, listType: listType})

        var endView = Backbone.View.extend({
          template: $('#template-list-loading').html(),
          show: true,

          render: function() {
            if (this.show) {
              this.$el.html(_.template(this.template)())
            } else {
              this.$el.empty()
            }
            return this
          },

          initialize: function() {
            var that = this
            this.listenTo(Backbone, 'list:loaded', function(which) {
              if (which === listType) {
                that.show = false
                that.render()
              }
            })
          }
        })
        var end = new endView()

        ContainerView.prototype.initialize.call(this, [list, end])
      }
    })
  
    return FramedView
  }
)
