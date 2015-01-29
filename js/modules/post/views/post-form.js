define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/template',
    'markdown'
  ],
  function($, _, Backbone, TemplateManager, Markdown) {
    var PostView = Backbone.View.extend({
      attributes: function() {
        return {
          style: 'display: none'
        }
      },

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
        var that = this
        TemplateManager.get('post-form', function(template) {
          that.$el.html(template())
          if (that.ready) that.run()
          that.listenTo(that, 'loaded', that.run)
        })

        return this
      },

      run: function() {
        converter = new Markdown.getSanitizingConverter()
        this.converter = converter
        editor = new Markdown.Editor(converter)
        editor.run()
      },

      initialize: function() {
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
