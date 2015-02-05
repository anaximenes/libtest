define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/containerview',
    'text!/templates/books/books-card-edit.html',
    'modules/post/main'
  ],
  function($, _, Backbone, ContainerView, Template, Post) {
    var EditView = Backbone.View.extend({
      events: {
        'submit': 'save',
        'click .button-save': 'save',
        'click .form-control': 'click'
      },

      init: function() {
        var els = this.$('.form-control')
        console.log(els[i])
        for (var i = 0; i < els.length; ++i) {
          $(els[i]).val($(els[i]).placeholder)
        }
      },

      click: function(event) {
        element = $(event.target)
        if (element.val() === '') {
          element.val(element[0].placeholder)
        }
      },

      save: function(event) {
        event.preventDefault()
        var attrs = {}
        var title = this.$('.input-title').val().trim()
        // if (title) attrs.title = title
        var publisher = this.$('.input-publisher').val().trim()
        // if (publisher) attrs.publisher = publisher
        var year = this.$('.input-year').val().trim()
        // if (year) attrs.year = year
        var isbn10 = this.$('.input-isbn-10').val().trim()
        // if (isbn10) attrs.isbn10 = isbn10
        var isbn13 = this.$('.input-isbn-13').val().trim()
        // if (isbn13) attrs.isbn13 = isbn13

        attrs.title = title
        attrs.publisher = publisher
        attrs.year = year
        attrs.isbn10 = isbn10
        attrs.isbn13 = isbn13

        console.log(attrs)
        // return

        if (!$.isEmptyObject(attrs)) {
          Backbone.trigger('book:edit:save', attrs)
        }
      },

      render: function() {
        var that = this
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(this.model.present()))
        }
        // this.init()
        return this
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render)
      }
    })

    var EditPage = ContainerView.extend({
      initialize: function(options) {
        var edit = new EditView(options)
        var post = new Post.PlainView({show: true})

        this.listenTo(options.model, 'change', function() {
          post.body = options.model.get('description')
          post.render()
        })

        ContainerView.prototype.initialize.call(this, [edit, post])
      }
    })

    return EditPage
  }
)