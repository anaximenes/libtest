define([
    'jquery',
    'underscore',
    'backbone',
    'modules/menu/views/item',
    'modules/menu/models/item'
  ],
  function($, _, Backbone, ItemView, MenuItem) {
    var MenuView = Backbone.View.extend({
      className: 'row menu',

      render: function() {
        this.$el.empty();
        for (var i = 0; i < this.collection.length; ++i) {
          var view = new ItemView({
            model: this.collection.at(i),
            classes: this.collection.menu + '-menu-item'
          });
          this.$el.append(view.render().el);
        }
        return this;
      },

      initialize: function(options) {
        options = options || {};
        this.collection = options.collection;

        this.listenTo(this.collection, 'change add remove reset', this.render);
        this.listenTo(Backbone, 'menu:extend', function(options) {
          this.collection.newItem(options);
        }.bind(this));
      }
    })

    return MenuView;
  }
)