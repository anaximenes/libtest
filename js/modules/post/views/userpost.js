define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/post/post-form.html',
    'i18n!modules/nls/post',
    'markdown'
  ],
  function($, _, Backbone, Template, i18n, Markdown) {
    var PostView = Backbone.View.extend({
      events: {
        'click .post-title': 'open',
        'click .button-cancel': 'close',
        'click #post-button': 'post'
      },

      open: function() {
        this.$('.post-input').slideDown('fast', 'swing')
        this.$('.user-avatar').slideDown('fast', 'swing')
      },

      close: function() {
        this.erase()
        this.$('.post-input').slideUp('fast', 'swing')
        this.$('.user-avatar').slideUp('fast', 'swing')
        this.validate()
     },

      erase: function() {
        this.$el.find('.post-title').val('')
        this.$el.find('#wmd-input').val('')
      },

      validate: function(title, body) {
        console.log('validate')
        var ok = true
        if (title === '') {
          this.$('.form-title').addClass('has-error')
          this.$('.error-title').show()
          ok = false
        } else {
          this.$('.form-title').removeClass('has-error')
          this.$('.error-title').hide()
        }
        if (body === '') {
          this.$('.form-body').addClass('has-error')
          this.$('.error-body').show()
          ok = false
        } else {
          this.$('.form-body').removeClass('has-error')
          this.$('.error-body').hide()
        }
        console.log(ok)
        return ok
      },

      post: function() {
        var title = this.$el.find('.post-title').val().trim()
        var body = this.$el.find('#wmd-input').val().trim()
        if (!this.validate(title, body)) return

        body = this.converter.makeHtml(body)

        Backbone.trigger('post:' + this.where, {
          title: title,
          body: body,
          id: this.id,
          collection: this.collection
        })
      },

      render: function() {
        if (this.show) this.$el.show()
        else this.$el.hide()

        this.$el.html(_.template(Template)(i18n))
        this.run()

        return this
      },

      run: function() {
        var $button = this.$('#wmd-button-bar')
        var $preview = this.$('#wmd-preview')
        var $input = this.$('#wmd-input')
        var converter = new Markdown.getSanitizingConverter()
        this.converter = converter
        var editor = new Markdown.Editor(converter, {button: $button, preview: $preview, input: $input})
        editor.run()
      },

      initialize: function(options) {
        options || (options = {})
        this.show = options.show
        this.collection = options.collection

        this.where = ''
        var that = this

        this.listenTo(Backbone, 'page:rendered', function(options) {
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
        this.listenTo(Backbone, 'post:accepted', function() {
          this.close()
        })
      }
    })

    return PostView
  }
)
