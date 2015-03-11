define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'text!/templates/books/books-report.html',
    'i18n!modules/nls/report',
    'bootstrap'
  ],
  function($, _, Backbone, Url, Template, i18n) {
    var ReportView = Backbone.View.extend({
      events: {
        'click .nav-report a':      'report',
        'click .report-other':      'reportOther',
        'click .report-open':       'reportOpen',
        'click .report-copyright':  'reportCopyright',
        'click .button-report':     'submit',
        'submit':                   'submit'
      },

      report: function(e) {
        e.preventDefault()
        $(this).tab('show')
      },

      reportOther: function() {
        this.$('.text-report').slideUp('fast')
        this.$('.text-report-other').slideDown('fast')
        this.$('.report-ok').hide()
        this.$('.report-error').hide()
        this.type = 'other'
      },

      reportOpen: function() {
        this.$('.text-report').slideUp('fast')
        this.$('.text-report-open').slideDown('fast')
        this.$('.report-ok').hide()
        this.$('.report-error').hide()
        this.type = 'open'
      },

      reportCopyright: function() {
        this.$('.text-report').slideUp('fast')
        this.$('.text-report-copyright').slideDown('fast')
        this.$('.report-ok').hide()
        this.$('.report-error').hide()
        this.type = 'copyright'
      },

      validate: function() {
        var $input = this.$('.report-message')
        if ($input.val().trim() === '') {
          this.$('.form-group').addClass('has-error')
          console.log('yo')
          return false
        } else {
          this.$('.form-group').removeClass('has-error')
          return true
        }
      },

      submit: function() {
        if (!this.validate()) return

        var model = new Backbone.Model({
          id: this.bookId,
          date: (new Date()).getTime(),
          message: this.$('.report-message').val(),
          kind: ['open', 'copyright', 'other'].indexOf(this.type) + 1
        })

        var that = this
        $.ajax({
          type: 'POST',
          url: Url('reportBook', this.bookId),
          data: model.toJSON(),
          xhrFields: { withCredentials: true },
          crossDomain: true,
          dataType: 'json',
          success: function() {
            that.$('.report-message').val('')
            that.$('.report-error').hide()
            that.$('.report-ok').show()
          },
          error: function() {
            that.$('.report-error').show()
            that.$('.report-ok').hide()
          }
        })
      },

      render: function() {
        this.$el.html(_.template(Template)(i18n))
        this.reportOpen()

        return this
      },

      initialize: function(options) {
        this.bookId = options.id
        this.render()
      }
    })

    return ReportView
  }
)
