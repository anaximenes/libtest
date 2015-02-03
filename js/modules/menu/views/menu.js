define([
    'jquery',
    'underscore',
    'backbone',
    'modules/menu/views/item'
  ],
  function($, _, Backbone, ItemView) {
    var MenuView = Backbone.View.extend({
      tagName: 'ul',
      className: 'container menu',

      render: function() {
        this.$el.empty()
        for (var i = 0; i < this.collection.length; ++i) {
          var view = new ItemView({
            model: this.collection.at(i),
            classes: this.collection.menu + '-menu-item'
          })
          this.$el.append(view.render().el)
        }
        return this
      },

      initialize: function(options) {
        options = options || {}
        this.collection = options.collection

        this.listenTo(this.collection, 'change add remove reset', this.render)
      }
    })

    return MenuView
  }
)