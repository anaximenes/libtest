define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/post/post-form.html',
    'markdown'
  ],
  function($, _, Backbone, Template, Markdown) {
    var PostView = Backbone.View.extend({
      events: {
        'click #post-button': 'post'
      },

      post: function() {
        //add error messages before return
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

        this.$el.html(_.template(Template)())

        return this
      },

      run: function() {
        var converter = new Markdown.getSanitizingConverter()
        this.converter = converter
        var editor = new Markdown.Editor(converter)
        editor.run()
      },

      initialize: function(options) {
        options || (options = {})
        this.show = options.show

        this.where = ''
        var that = this

        this.listenTo(Backbone, 'page:rendered', function(options) {
          if (options.page === 'bookReviews') {
            that.where = 'review'
          }
          if (options.page === 'bookQuestions') {
            that.where = 'question'
          }

          that.run()
        })

        this.listenTo(Backbone, 'post:show', function() {
          this.$el.toggle()
        })
      }
    })

    return PostView
  }
)