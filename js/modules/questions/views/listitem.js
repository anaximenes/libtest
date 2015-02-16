define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/questions/questions-list-entry.html',
    'modules/questions/views/votes'
  ],
  function($, _, Backbone, Template, VotesView) {
    ListItemView = Backbone.View.extend({
      votesView: new VotesView(),

      render: function() {
        this.$el.html(_.template(Template)(this.model.toJSON()))

        this.votesView.model = this.model;
        this.votesView.$el = this.$el.find('.questions-votes-container').first();
        this.votesView.render();
        return this
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return ListItemView
  }
)
