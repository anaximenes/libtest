define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/post/post-book-edit.html',
    'i18n!nls/post',
    'markdown'
  ],
  function($, _, Backbone, Template, i18n, Markdown) {
    var PostView = Backbone.View.extend({
      events: {
        'click .button-save': 'save',
        'click .button-cancel': 'cancel'
      },

      save: function(event) {
        var body = this.$('.wmd-input').val().trim()
        if (body === '') return
        this.body = this.converter.makeHtml(body)
        Backbone.trigger('book:edit:save', { description: this.body })
      },

      render: function() {
        if (this.show) this.$el.show()
        else this.$el.hide()

        this.$el.html(_.template(Template)({body: this.body}))
        this.run()
        return this
      },

      run: function() {
        var $button = this.$('.wmd-button-bar')
        var $preview = this.$('.wmd-preview')
        var $input = this.$('.wmd-input')

        var converter = new Markdown.getSanitizingConverter()
        this.converter = converter
        var editor = new Markdown.Editor(converter, {button: $button, preview: $preview, input: $input})
        editor.run()
      },

      initialize: function(options) {
        options || (options = {})
        this.show = options.show
        this.body = options.body || ''
        this.where = ''

        this.listenTo(Backbone, 'post:save', this.save);
      }
    })

    return PostView
  }
)
