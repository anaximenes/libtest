define([
    'jquery',
    'underscore',
    'backbone',
  ],
  function($, _, Backbone) {
    var CollectionView = Backbone.View.extend({
      model: Backbone.Model,
      ItemView: Backbone.View,
      processing: false,  //it appears to be here for no particular reason but I'm not sure if I should get rid of it

      loadUp: function() {
        if (this.processing) {
          return
        }
        var that = this
        if (this.collection.thereIsMore()) {
          this.processing = true
          this.collection.loadMore({
            success: function(collection, response) {
              that.processing = false
            }
          })
        }
      },

      addView: function(model, collection, options) {
        this.last || (this.last = -1)
        var current = this.collection.indexOf(model)

        var view = new this.ItemView({
          model: model
        })

        if (!this.views.length || this.views.length === current) this.views.push(view)
        else this.views.splice(current, 0, view)

        if (this.collection.indexOf(model) > this.last) {
          this.$el.append(this.views[this.views.length - 1].render().el)
        } else {
          this.draw()
        }

        this.last = current;
      },

      draw: function() {
        this.$el.empty()
        for (var i = 0; i < this.views.length; i++) {
          this.$el.append(this.views[i].render().el)
        }
      },

      render: function() {
        this.removeChildViews()
        for (var i = 0; i < this.collection.length; i++) {
          this.views.push(new this.ItemView({
            model: this.collection.at(i)
          }))
        }
        this.draw()
        return this
      },

      initialize: function(options) {
        this.views = []
        options = options ? options : {}
        this.collection = options.collection

        this.collection.updateAll()

        var that = this
        this.listenTo(this.collection, 'add', this.addView)
        this.listenTo(this.collection, 'reset remove', this.render)
        this.listenTo(Backbone, 'page:scrollbottom', this.loadUp)
        this.listenTo(Backbone, 'page:update', function() {
          that.collection.updateAll()
        })
      },

      removeChildViews: function() {
        for (var i = this.views.length - 1; i >= 0; --i) {
          this.views[i].remove()
          this.views.pop()
        }
      },

      remove: function() {
        this.removeChildViews()
        Backbone.View.prototype.remove.call(this);
      }
    })

    return CollectionView
  }
)
