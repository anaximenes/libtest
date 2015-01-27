define([
    'jquery',
    'underscore',
    'backbone',
    'markdown'
  ],
  function($, _, Backbone, Markdown) {
    var PostView = Backbone.View.extend({
      template: $('#template-post').html(),

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

        // console.log('catched ', 'post:' + this.where)
        Backbone.trigger('post:' + this.where, {title: title, body: body, id: this.id})
      },

      render: function() {
        var html = _.template(this.template)()
        this.$el.html(html)
        return this
      },

      initialize: function() {
        this.where = ''
        var that = this

        this.listenTo(Backbone, 'page:rendered', function(options) {
          converter = new Markdown.getSanitizingConverter()
          this.converter = converter
          editor = new Markdown.Editor(converter)
          editor.run()

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
