define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/template'
  ],
  function($, _, Backbone, TemplateManager) {
    ListItemView = Backbone.View.extend({
      render: function() {
        if (this.model.complete()) {
          var that = this
          TemplateManager.get('reviews-list-entry', function(template) {
            that.$el.html(template(that.model.toJSON()))
          })
        }

        return this
      },

      initialize: function(options) {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return ListItemView
  }
)
