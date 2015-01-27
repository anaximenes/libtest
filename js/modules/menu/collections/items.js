define([
    'jquery',
    'underscore',
    'backbone',
    'modules/menu/models/item'
  ],
  function($, _, Backbone, MenuItem) {
    var allowed = new Set([
      'books', 'questions', 'favorites', 'comments', 'add', 'recent', 'all', 'edit', 'description'
    ])

    var Collection = Backbone.Collection.extend({
      model: MenuItem,
      menu: '',

      initialize: function(models, options) {
        this.menu = options.menu
        this.models = models
        var that = this

        this.listenTo(Backbone, 'controller:transition', function(options) {
          if (this.menu != options.menu) return
          var page = options.page
          if (allowed.has(page)) {
            Backbone.trigger('menu:activate', {menu: this.menu, page: page})
          }
        })

        this.listenTo(Backbone, 'menu:extend', function(options) {
          if (this.menu != options.menu) return
          that.add(new MenuItem(options), {merge: true})
          Backbone.trigger('menu:activate', {menu: this.menu, page: options.page})
        })
      }
    })

    return Collection
  }
)
