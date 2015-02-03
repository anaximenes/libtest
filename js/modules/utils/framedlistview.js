define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/utils/containerview',
    'modules/utils/listendview',
  ],
  function($, _, Backbone, Url, ContainerView, EndView) {
    var FramedView = ContainerView.extend({
      initialize: function(options) {
        options = options || {}

        var collection = options.collection ||
                      new this.Collection([], {
                        url: this.url
                      })
        var list = new this.ListView({collection: collection})

        var end = new EndView({collection: collection})

        ContainerView.prototype.initialize.call(this, [list, end])
      }
    })

    return FramedView
  }
)
