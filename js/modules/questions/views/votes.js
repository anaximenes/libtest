define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/questions/questions-votes.html'
  ],
  function($, _, Backbone, Template) {
    var VotesView = Backbone.View.extend({
      events: {
        'click i': 'click'
      },

      click: function(e) {
        var $t = $(e.target);
        var action = $t.hasClass('active') ? 'undo' : $t.data('action');
        if (this.vote(action)) {
          this.$('i').removeClass('active');
          if (action != 'undo') this.$('i.glyphicon-chevron-'+$t.data('action')).addClass('active');
        }
      },

      render: function() {
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(this.model.present()));
        }
        return this;
      },

      vote: function(action) {
        var actions = ['up','down','undo'];
        if (actions.indexOf(action) == -1) return false;
        console.log(action);
        return true;
      }

    });

    return VotesView;
  }
);
