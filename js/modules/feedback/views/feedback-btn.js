define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/feedback/button.html',
    'text!templates/feedback/feedback-form.html',
    'i18n!nls/menu'
  ],
  function($, _, Backbone, ButtonTemplate, FormTemplate, i18n) {
    var View = Backbone.View.extend({
      events: {
        'click .feedback-button': 'showForm'
      },

      showForm: function (event, target) {
        console.log(event, target);
      },

      render: function () {
        this.$el.html(_.template(ButtonTemplate)(i18n));
        return this;
      },

      initialize: function () {
        this.render();
        $('body').append(this.el);
      }
    });

    return View;
  }
)
