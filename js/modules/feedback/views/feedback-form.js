define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'text!/templates/feedback/feedback-form.html',
    'i18n!modules/nls/report',
    'bootstrap'
  ],
  function($, _, Backbone, Url, Template, i18n) {
    var ReportView = Backbone.View.extend({
      events: {
        'submit': 'submit',
        'click .close-btn': 'toPreviousPage'
      },
      toPreviousPage: function () {
      // TODO: This code reloads the page. Need to be fixed.
        history.back();
      },
      validate: function() {
        var $input = this.$('.report-message');
        if ($input.val().trim() === '') {
          this.$('.form-group').addClass('has-error');
          return false;
        } else {
          this.$('.form-group').removeClass('has-error');
          return true;
        }
      },
      submit: function (event) {
        event.preventDefault();
        if (!this.validate()) return;
        var model = new Backbone.Model({
          id: this.bookId,
          date: (new Date()).getTime(),
          message: this.$('.report-message').val(),
          kind: 3
        });
        model.save(undefined, {
          url: Url('feedback'),
          success: function() {
            this.$('.report-message').val('')
            this.$('.report-ok').show()
          }.bind(this)
        });
      },
      render: function() {
        this.$el.html(_.template(Template)(i18n))

        return this
      },

      initialize: function() {
        this.render()
      }
    })

    return ReportView
  }
)
/*
define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/feedback/button.html',
    'text!/templates/feedback/feedback-form.html',
  ],
  function($, _, Backbone, ButtonTemplate, FormTemplate) {
    var View = Backbone.View.extend({
      render: function () {
        console.log('feedback');
        return this;
      }
    });

    return View;
  }
)
*/
