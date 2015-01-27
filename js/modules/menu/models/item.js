define([
    'jquery',
    'underscore',
    'backbone'
  ],
  function($, _, Backbone) {
    var ID = 0;
    var pageMap = {}

    var Model = Backbone.Model.extend({
      initialize: function(options) {
        id = pageMap[options.page] || (pageMap[options.page] = ++ID)
        this.set('page', options.page)
        this.set('id', pageMap[options.page])
        this.set('title', options.title)
        this.set('path', options.path)
        this.set('toRight', options.toRight ? true : false)
        this.set('full', options.full ? true : false)
      }
    })

    return Model
  }
)
