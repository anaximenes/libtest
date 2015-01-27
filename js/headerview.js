define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone) {
    var HeaderView = Backbone.View.extend({
      el: $('#signInHeader'),

      render: function() {
      },

      signIn: function(id) {
        this.signed = true
        // this.userId = id
        this.elements = this.elements.map(function(i) { return i.toggle() })
        // this.render()
      },

      initialize: function (options) {
        this.elements = [
          $('#page-signup').show(),
          $('#page-signin').show(),
          $('#page-signout').hide(),
          $('#page-nickname').hide()
        ]

        this.signed = false
        // this.userId = options.userId
        // this.render()

        this.listenTo(Backbone, 'user:signed', this.signIn)
        this.listenTo(Backbone, 'user:signout', this.signOut)
      }
    })

    return HeaderView
  }
)