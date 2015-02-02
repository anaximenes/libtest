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
        'click #book-edit-title-a': 'clickTitle',
        'click #book-edit-title-cancel': 'clickTitleCancel',
        'click #book-edit-authors-a': 'clickAuthors',
        'click #book-edit-authors-cancel': 'clickAuthorsCancel',
      },

      clickTitle: function() {
        console.log('yo')
        this.$('#book-edit-title-input').show()
        this.$('#book-edit-title-a').hide()
      },

      clickTitleCancel: function(e) {
        e.preventDefault()
        console.log('yo')
        this.$('#book-edit-title-input').hide()
        this.$('#book-edit-title-a').show()
      },

      clickAuthors: function() {
        console.log('yo')
        this.$('#book-edit-authors-input').show()
        this.$('#book-edit-authors-a').hide()
      },

      clickAuthorsCancel: function(e) {
        e.preventDefault()
        console.log('yo')
        this.$('#book-edit-authors-input').hide()
        this.$('#book-edit-authors-a').show()
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