define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/template'
  ],
  function($, _, Backbone, TemplateManager) {
    ListItemView = Backbone.View.extend({
      render: function() {
        var that = this
        TemplateManager.get('questions-list-entry', function(template) {
          that.$el.html(template(that.model.toJSON()))
        })

        // var html = undefined
        // html = _.template(this.template)(this.model.toJSON())
        // if (this.model.complete()) {
        //     console.log('QuestionView: render')
        //     html = _.template(this.template)(this.model.toJSON())
        //  } else {
        //     html = _.template(this.templateLoading)(this.model.toJSON())
        //  }
        // this.$el.html(html)
        return this
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return ListItemView
  }
)
