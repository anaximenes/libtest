define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/user/header.html',
  'i18n!modules/nls/header'
  ], function($, _, Backbone, Template, i18n) {

    var HeaderView = Backbone.View.extend({
      el: $('#signInHeader'),

      render: function() {
        var data = this.model.toJSON()
        _.extend(data, i18n)
        this.$el.html(_.template(Template)(data))
        this.update()
        return this
      },

      update: function() {
        if (this.model.id) {
          this.$('#page-signup, #page-signin').hide()
          this.$('#page-nickname, #page-signout').show()
        } else {
          this.$('#page-nickname, #page-signout').hide()
          this.$('#page-signup, #page-signin').show()
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