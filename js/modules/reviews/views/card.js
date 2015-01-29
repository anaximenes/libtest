define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/template'
  ],
  function($, _, Backbone, TemplateManager) {
    var CardItemView = Backbone.View.extend({
      render: function() {
        var that = this
        if (this.model.complete()) {
          TemplateManager.get('reviews-card', function(template) {
            that.$el.html(template(that.model.present()))
          })
        }
        return this
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return CardItemView
  }
)