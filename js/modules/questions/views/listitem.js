define([
    'jquery',
    'underscore',
    'backbone'
  ],
  function($, _, Backbone) {
    ListItemView = Backbone.View.extend({
      template: $('#template-questions-list-entry').html(),
      templateLoading: $('#template-question-entry-loading').html(),

      events: {
          'click .title, .book-image': 'click'
      },

      click: function() {
        Backbone.trigger('question:open', this)
      },

      render: function() {
        var html = undefined
        html = _.template(this.template)(this.model.toJSON())
        // if (this.model.complete()) {
        //     console.log('QuestionView: render')
        //     html = _.template(this.template)(this.model.toJSON())
        //  } else {
        //     html = _.template(this.templateLoading)(this.model.toJSON())
        //  }
        this.$el.html(html)
        return this
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return ListItemView
  }
)
