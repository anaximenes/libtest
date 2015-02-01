define([
    'jquery',
    'underscore',
    'backbone',
    'modules/menu/models/item'
  ],
  function($, _, Backbone, MenuItem) {
    var Collection = Backbone.Collection.extend({
      model: MenuItem,
      menu: '',

      initialize: function(models, options) {
        this.menu = options.menu
        this.models = models
        var that = this

        this.listenTo(Backbone, 'menu:extend', function(options) {
          if (this.menu != options.menu) return
          that.add(new MenuItem(options), {merge: true})
          Backbone.trigger('menu:refresh')
        })
      }
    })

    return Collection
  }
)
