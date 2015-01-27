define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/containerview',
    'modules/post/main'
  ],
  function($, _, Backbone, ContainerView, Post) {
    var CardItemView = Backbone.View.extend({
      template: $('#template-book-card-edit').html(),
      templateLoading: $('#template-book-entry-loading').html(),

      render: function() {
        var html = undefined
        if (this.model.complete()) {
          html = _.template(this.template)(this.model.toJSON())
        } else {
          html = _.template(this.templateLoading)(this.model.toJSON())
        }
        this.$el.html(html)
        return this
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    var view = ContainerView.extend({
      initialize: function(options) {
        ContainerView.prototype.initialize.call(this, [new CardItemView(), new Post()])
      }
    })

    return CardItemView
  }
)