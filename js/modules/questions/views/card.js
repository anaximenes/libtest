define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/questions/questions-card.html',
    'modules/post/main'
  ],
  function($, _, Backbone, Template, Post) {
    var CardItemView = Backbone.View.extend({
      answerForm: null,
      
      render: function() {
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(this.model.present()));
          this.answerForm.$el = this.$el.find('.answerForm').first();
          this.answerForm.render();
        }
        return this;
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render);

        this.answerForm = new Post.UserPostView({
          id: this.model.id,
          show: true
        });

      }
    })

    return CardItemView
  }
)