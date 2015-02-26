define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/post/post-form-simple.html',
    'i18n!modules/nls/post',
    'markdown'
  ],
  function($, _, Backbone, Template, i18n, Markdown) {
    var AnswerPost = Backbone.View.extend({
      events: {
        'click .wmd-input': 'open',
        'click .button-cancel': 'close',
        'click #post-button': 'post'
      },

      open: function() {
        this.$('.wmd-input').animate({ 'rows': 6 }, 200);
        // this.$('.wmd-input').attr('rows', 6) //slideDown('fast', 'swing')
        this.$('.user-avatar').slideDown('fast', 'swing')
        this.$('.post-preview').slideDown('fast', 'swing')
        this.$('.post-buttons').slideDown('fast', 'swing')
      },

      close: function() {
        this.erase()
        this.$('.save-error').hide()
        this.$('.wmd-input').animate({ 'rows': 1 }, 200);
        // this.$('.wmd-input').attr('rows', '1')
        this.$('.post-buttons').slideUp('fast', 'swing')
        this.$('.post-preview').slideUp('fast', 'swing')
        this.$('.user-avatar').slideUp('fast', 'swing')
        this.validate()
     },

      erase: function() {
        this.$('#wmd-input').val('')
      },

      validate: function(body) {
        console.log('validate')
        var ok = true
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
        var body = this.$el.find('#wmd-input').val().trim()
        if (!this.validate(body)) return

        body = this.converter.makeHtml(body)

        Backbone.trigger('post:' + this.where, {
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
          if (options.page === 'questionAnswers') {
            that.where = 'answer'
          }
        })

        this.listenTo(Backbone, 'post:save:ok', function() {
          that.$('.save-error').show()
          this.close()
        })
        this.listenTo(Backbone, 'post:save:error', function() {
          that.$('.save-error').show()
        })
      }
    })

    return AnswerPost
  }
)
