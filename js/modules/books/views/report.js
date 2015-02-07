define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/books/books-report.html',
    'bootstrap'
  ],
  function($, _, Backbone, Template) {
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
        this.type = 'other'
      },

      reportOpen: function() {
        this.$('.text-report').slideUp('fast')
        this.$('.text-report-open').slideDown('fast')
        this.type = 'open'
      },

      reportCopyright: function() {
        this.$('.text-report').slideUp('fast')
        this.$('.text-report-copyright').slideDown('fast')
        this.type = 'copyright'
      },

      submit: function() {
        console.log('REPORT', this.bookId)
      },

      render: function() {
        this.$el.html(_.template(Template)())
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