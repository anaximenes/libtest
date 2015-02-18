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
        this.removeChildViews();
        for (var i = 0; i < this.collection.length; ++i) {
          this.views.push(new ItemView({
            model: this.collection.at(i),
            classes: this.collection.menu + '-menu-item'
          }));
          this.$el.append(this.views[i].render().el);
        }
        return this;
      },

      removeChildViews: function() {
        for (var i = this.views.length - 1; i >= 0; --i) {
          this.views[i].remove();
          this.views.pop();
        }
      },

      remove: function() {
        this.removeChildViews();
        Backbone.View.prototype.remove.call(this);
      },

      initialize: function(options) {
        this.views = [];
        options = options || {};
        this.collection = options.collection;

        this.listenTo(this.collection, 'change add remove reset', this.render);
        this.listenTo(Backbone, 'menu:extend', function(options) {
          this.collection.newItem(options);
        }.bind(this));
        this.listenTo(Backbone, 'menu:remove', function(options) {
          this.collection.removeItem(options);
        }.bind(this));
      }
    })

    return MenuView;
  }
)