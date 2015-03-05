define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/questions/questions-list-entry.html',
    'modules/questions/views/votes'
  ],
  function($, _, Backbone, Template, VotesView) {
    ListItemView = Backbone.View.extend({
      votesView: undefined,

      render: function() {
        this.$el.html(_.template(Template)(this.model.toJSON()))
        this.$('.questions-votes-container').html(this.votesView.render().el);
        return this
      },

      remove: function() {
        this.votesView.remove();
        Backbone.View.prototype.remove.apply(this);
      },

      initialize: function() {
        this.votesView = new VotesView({ model: this.model });
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return ListItemView
  }
)
