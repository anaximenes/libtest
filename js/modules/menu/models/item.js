define([
    'jquery',
    'underscore',
    'backbone',
    'i18n!modules/nls/menu'
  ],
  function($, _, Backbone, i18n) {
    var ID = 0;
    var pageMap = {}

    var Model = Backbone.Model.extend({
      initialize: function(options) {
        id = pageMap[options.page] || (pageMap[options.page] = ++ID)
        this.set('page', options.page)
        this.set('id', pageMap[options.page])
        
        if (i18n[options.title]) {
          this.set('title', i18n[options.title])
        } else {
          this.set('title', options.title)
        }
        
        this.set('class', options.class)
        this.set('path', options.path)
        this.set('toRight', options.toRight ? true : false)
        this.set('full', options.full ? true : false)
      }
    })

    return Model
  }
)
