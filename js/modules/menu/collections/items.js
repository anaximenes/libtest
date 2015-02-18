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

      newItem: function(options) {
        if (this.menu === options.menu) {
          this.add(new MenuItem(options), {merge: true});
          Backbone.trigger('menu:refresh');
        }
      },

      removeItem: function(options) {
        if (this.menu === options.menu) {
          this.remove(this.findWhere({page: options.page}));
          Backbone.trigger('menu:refresh');
        }
      },

      initialize: function(models, options) {
        this.menu = options.menu;
        this.models = models;
      }
    })

    return Collection;
  }
)
