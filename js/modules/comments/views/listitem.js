define([
    'jquery',
    'underscore',
    'backbone',
    'modules/comments/models/comment'
  ],
  function($, _, Backbone, CommentModel) {
    var template = _.template($('#template-comments-list-entry').html())

    var CommentView = Backbone.View.extend({
      render: function() {
        this.$el.html(template(this.model.toJSON()))
        return this
      },

      initialize: function() {
        this.listenTo(this, 'change', this.render)
      }
    })

    return CommentView
  }
)
