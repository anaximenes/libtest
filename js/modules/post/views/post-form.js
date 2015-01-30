define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/template',
    'markdown'
  ],
  function($, _, Backbone, TemplateManager, Markdown) {
    var PostView = Backbone.View.extend({
      template: 'post-form',
      events: {
        'click #post-button': 'post'
      },

      post: function() {
        var title = this.$el.find('.post-title').val().trim()
        if (title === '') return
        var body = this.$el.find('#wmd-input').val().trim()
        if (body === '') return
        body = this.converter.makeHtml(body)

        Backbone.trigger('post:' + this.where, {title: title, body: body, id: this.id})
      },

      render: function() {
        if (this.show) this.$el.show()
        else this.$el.hide()

        var that = this
        TemplateManager.get(this.template, function(template) {
          that.$el.html(template({body: that.body}))
          if (that.ready) that.run()
          else that.listenToOnce(that, 'loaded', that.run)
        })

        return this
      },

      run: function() {
        var converter = new Markdown.getSanitizingConverter()
        var editor = new Markdown.Editor(converter)
        editor.run()
      },

      initialize: function(options) {
        options || (options = {})
        this.show = options.show
        if (options.template) this.template = options.template
        if (options.body) this.body = options.body

        this.where = ''
        var that = this

        this.listenTo(Backbone, 'page:rendered', function(options) {
          that.ready = true
          that.trigger('loaded')

          if (options.page === 'bookReviews') {
            that.where = 'review'
          }
          if (options.page === 'bookQuestions') {
            that.where = 'question'
          }
        })

        this.listenTo(Backbone, 'post:show', function() {
          this.$el.toggle()
        })
      }
    })

    return PostView
  }
)
