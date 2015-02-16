define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/questions/questions-votes.html'
  ],
  function($, _, Backbone, Template) {
    var VotesView = Backbone.View.extend({
      render: function() {
        var self = this;
        this.$el.html(_.template(Template)(this.model.present()));
        this.$el.find('p').each(function(){
          $(this).click(function(){
            self.vote($(this).data('action'));
          });
        });
        return this;
      },

      initialize: function() {
        //this.listenTo(this.model, 'change', this.render);
      },

      vote: function(action) {
        var actions = ['up','down','undo'];
        if (actions.indexOf(action) == -1) return false;
        console.log(action);
      }

    });

    return VotesView;
  }
);
