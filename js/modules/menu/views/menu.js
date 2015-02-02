define([
    'jquery',
    'underscore',
    'backbone',
    'modules/menu/views/item'
  ],
  function($, _, Backbone, ItemView) {
    var MenuView = Backbone.View.extend({
      className: 'container menu',

      render: function() {
        this.$el.empty().html('<div class="menu-left"></div> <div class="menu-right"></div>')
        for (var i = 0; i < this.collection.length; ++i) {
          var model = this.collection.at(i)
          var view = new ItemView({
            model: model,
            classes: this.collection.menu + '-menu-item'
          })
          if (model.get('toRight')) {
            this.$el.find('.menu-right').append(view.render().el)
          } else {
            this.$el.find('.menu-left').append(view.render().el)
          }
          // this.$el.append(view.render().el)
        }
        this.$el.append('<hr style="margin: 5px">')
        return this
      },

      initialize: function(options) {
        options = options || {}
        this.collection = options.collection

        this.listenTo(this.collection, 'add remove reset change', this.render)
      }
    })

    return MenuView
  }
)