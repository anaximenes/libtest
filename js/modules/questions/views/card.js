define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/questions/questions-card.html',
    'modules/questions/views/votes'
  ],
  function($, _, Backbone, Template, VotesView) {
    var CardItemView = Backbone.View.extend({
      votesView: new VotesView(),

      render: function() {
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(this.model.present()))
          this.votesView.model = this.model;
          this.votesView.$el = this.$el.find('.questions-votes-container').first();
          this.votesView.render();
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