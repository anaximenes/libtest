define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/template',
    'modules/utils/containerview',
    'modules/post/main'
  ],
  function($, _, Backbone, TemplateManager, ContainerView, Post) {
    var CardItemView = Backbone.View.extend({
      render: function() {
        var that = this
        if (this.model.complete()) {
          TemplateManager.get('books-card-edit', function(template) {
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