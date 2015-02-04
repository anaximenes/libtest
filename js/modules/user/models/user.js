define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
    'modules/user/models/auth',
    'modules/user/models/signup'
  ],
  function($, _, Backbone, Url, AuthModel, SignupModel) {
    var UserModel = Backbone.Model.extend({
      defaults: {
        nickname: ''
      },
      id: undefined,

      //don't trust this!
      isLogged: function() {
        return (typeof(this.id) != 'undefined')
      },

      checkState: function(action) {
        action || (action = {})
        var user = new AuthModel()

        var that = this
        user.fetch({
          success: function(model, response) {
            that.set('id', model.id)
            that.set('nickname', model.get('nickname'))
            that.set('checked', true)
            if (model.id) Backbone.trigger('user:signed', model.id)
            if (action.success) action.success()
          }, error: function(e) {
            that.set('checked', true)
            if (action.error) action.error()
          }
        })
      },

      logOut: function() {
        var that = this
        if (typeof(this.id) != 'undefined') {
          var model = new AuthModel({'id': this.id});
          model.destroy({url: Url('session'),
            success: function() {
              console.log('signed out!')
              that.set('id', undefined)
              Backbone.trigger('user:signout')
            }
          })
        }
      },

      requireLogin: function(action) {
        if (this.get('checked')) {
          if (typeof(this.id) != 'undefined') {
            action.success()
          } else {
            action.error()
          }
        } else {
          checkState(action)
        }
      },


      signin: function(data) {
        var that = this
        var model = new AuthModel({
          'email': data.email,
          'password': data.password
        })
        model.save([], {
          success: function(model, response) {
            console.log('signed ', model.id)
            that.set('id', model.id)
            that.set('nickname', model.get('nickname'))
            Backbone.trigger('user:signed', model.id)
            // Backbone.history.history.back()
          },
          error: function(model, response, xhr) {
            console.log('here goes error')
            console.log(model)
            console.log(response.status)
          }
        })

      },

      signup: function(data) {
        console.log('signup!')
        var that = this
        var model = new SignupModel({
          'email': data.email,
          'password': data.password,
          'fullname': data.name
        })
        model.save([], {
          success: function(model, response) {
            console.log('signed up ', model.id)
            that.set('id', model.id)
            that.set('nickname', model.get('nickname'))
            Backbone.trigger('user:signed', model.id)
          },
          error: function(model, response, xhr) {
            console.log('here goes error')
            console.log(model)
            console.log(response.status)
          }
        })
      },

      toggleFavorite: function(book) {
        var url = Url('favorites', this.id)

        var Collection = Backbone.Collection.extend({
          url: url
        })
        var collection = new Collection()

        var model = new Backbone.Model({
          id: book.id,
          urlRoot: url
        })

        var fetch = function() {
          book.fetch()
        }

        if (book.get('isFavorite')) {
          model.destroy({
            url: url + book.id,
            success: fetch,
            error: fetch
          })
        } else {
          collection.create({id: book.id}, {
            success: fetch,
            error: fetch
          })
        }
      },

      post: function(where, options) {
        var model = new Backbone.Model({
          usersId: this.id,
          booksId: (options.id ? options.id : null),
          title: options.title,
          body: options.body
        })
        model.url = Url(where, this.id)
        console.log(model)

        model.save([], {
          success: function(newModel, response) {
            options.collection.add(newModel.toJSON(), {at: 0})
            Backbone.trigger('post:accepted')
          },
          error: function(model, xhr, options) {
            console.log('bad luck...')
            console.log(xhr)
            console.log(options)
          }
        })
      },

      postQuestion: function(options) {
        this.post('userQuestions', options)
      },

      postReview: function(options) {
        this.post('userReviews', options)
      },

      initialize: function() {
        this.set('checked', false)

        this.checkState()

        this.listenTo(Backbone, 'book:toggleFavorite', this.toggleFavorite)
        this.listenTo(Backbone, 'post:question', this.postQuestion)
        this.listenTo(Backbone, 'post:review', this.postReview)
        this.listenTo(Backbone, 'user:signin', this.signin)
        this.listenTo(Backbone, 'user:signup', this.signup)
      }
    })

    return UserModel
  }
)
