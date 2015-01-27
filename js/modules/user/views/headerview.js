define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone) {
    var $beforeLogin = $('#page-signup, #page-signin')
    var $afterLogin = $('#page-nickname, #page-signout')

    var HeaderView = Backbone.View.extend({
      el: $('#signInHeader'),

      render: function() {
        if (this.model.id) {
          $beforeLogin.hide()
          $afterLogin.show()
        } else {
          $beforeLogin.show()
          $afterLogin.hide()
        }
      },

      initialize: function (options) {
        this.render()
        this.listenTo(this.model, 'change', this.render)
      }
    })

    return HeaderView
  }
)