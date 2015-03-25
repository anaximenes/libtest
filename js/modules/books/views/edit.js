define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/utils/containerview',
    'text!templates/books/books-card-edit.html',
    'modules/post/main'
  ],
  function($, _, Backbone, Url, ContainerView, Template, Post) {
    var EditView = Backbone.View.extend({
      events: {
        'submit': 'saveButton',
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

        var selectize = this.$('.input-tags')
        selectize = selectize[0].selectize
        console.log(selectize.items)

        this.save(attrs)
        Backbone.trigger('post:save');
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

        var TagModel = Backbone.Model
        var TagsCollection = Backbone.Collection.extend({
          url: function() {
            return Url('tagsSearch', this.query || '')
          },

          parse: function(response) {
            return response.results
          },

          initialize: function(options) {
            options = options || {}
            if (options.query) this.query = options.query
          }
        })

        this.$('.input-tags').selectize({
          labelField: 'title',
          searchField: 'title',
          valueField: 'id',
          options: [{title: 'a', id: 1}],
          ID: -1,
          create: function(input, callback) {
            callback({ title: input, id: 0 })
            // var model = new Backbone.Model()
            // model.save({ title: input }, {
            //   url: Url('tags'),
            //   success: function() {
            //     callback({ title: input, id: model.id })
            //   },
            //   error: function() {
            //     console.log('error saving tag')
            //     callback()
            //   }
            // })
          },
          render: {
            option: function(item, escape) {
              return '<div>' + escape(item.title) + '</div>'
            }
          },
          load: function(query, callback) {
            var collection = new TagsCollection({ query: query })
            collection.fetch({
              success: function() {
                var output = collection.models
                output = output.map(function(e) { return { title: e.get('title'), id: e.id } })
                callback(output)
              },
              error: function() {
                callback()
              }
            })
          }
        })
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
