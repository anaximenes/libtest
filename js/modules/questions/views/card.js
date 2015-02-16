define([
    'jquery',
    'underscore',
    'backbone',
    'modules/questions/views/votes',
    'text!/templates/questions/questions-card.html'
  ],
  function($, _, Backbone, Template, VotesView) {
    var CardItemView = Backbone.View.extend({
      render: function() {
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(this.model.present()))
          this.$el.find('.questions-votes-container').each(function(){
            //$(this).html(VotesView.render());
          });
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