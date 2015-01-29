define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/utils/template',
    'modules/utils/containerview'
  ],
  function($, _, Backbone, Url, TemplateManager, ContainerView) {
    var FramedView = ContainerView.extend({
      initialize: function(options) {
        options = options || {}
        var listType = options.listType
          
        var collection = options.collection ||
                      new this.Collection([], {
                        url: this.url
                      })
        var list = new this.ListView({collection: collection, listType: listType})

        var endView = Backbone.View.extend({
          show: true,

          render: function() {
            if (this.show) {
              var that = this
              TemplateManager.get('list-loading', function(template) {
                that.$el.html(template())
              })
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
