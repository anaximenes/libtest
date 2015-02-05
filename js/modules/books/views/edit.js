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
        'click .button-save': 'saveButton',
        'click .button-cancel': 'cancel',
        'click .form-control': 'click'
      },

      click: function(event) {
        element = $(event.target)
        if (element.val() === '') {
          element.val(element[0].placeholder)
        }
      },

      save: function(attrs) {
        if (!$.isEmptyObject(attrs)) {
          this.model.save(attrs, {
            success: function() {
            },
            error: function() {
            }
          })
        }
      },

      saveButton: function(event) {
        event.preventDefault()
        var attrs = {}
        attrs.title = this.$('.input-title').val().trim()
        attrs.publisher = this.$('.input-publisher').val().trim()
        attrs.year = this.$('.input-year').val().trim()
        attrs.isbn10 = this.$('.input-isbn-10').val().trim()
        attrs.isbn13 = this.$('.input-isbn-13').val().trim()

        this.save(attrs)
      },

      cancel: function(event) {
        event.preventDefault()
        this.model.trigger('change')
      },

      render: function() {
        var that = this
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(this.model.present()))
        }
        return this
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render)
        this.listenTo(Backbone, 'book:edit:save', this.save)
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