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
          TemplateManager.get('questions-card', function(template) {
            that.$el.html(template(that.model.toJSON()))
          })
        }

        // var html = undefined
        // if (this.model.complete()) {
        //   console.log('complete')
        //   html = _.template(this.template)(this.model.toJSON())
        // } else {
        //   console.log('not complete')
        //   html = _.template(this.templateLoading)(this.model.toJSON())
        // }
        // this.$el.html(html)
        return this
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return CardItemView
  }
)