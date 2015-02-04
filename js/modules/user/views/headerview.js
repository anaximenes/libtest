define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/user/header.html',
  'i18n!modules/nls/header'
  ], function($, _, Backbone, Template, i18n) {

    var HeaderView = Backbone.View.extend({
      el: $('#signInHeader'),

      events: {
        'click .locale' : 'click'
      },

      click: function() {
        if (this.locale.slice(0, 2) === 'en') {
          this.locale = 'ru'
          this.$('.locale').html('en')
        } else {
          this.locale = 'en-us'
          this.$('.locale').html('ru')
        }
        localStorage.setItem('locale', this.locale)
        location.reload()
      },

      render: function() {

        var data = this.model.toJSON()
        _.extend(data, i18n)
        this.$el.html(_.template(Template)(data))
        this.update()

        this.$('.locale').html(this.locale.slice(0, 2) === 'ru' ? 'en' : 'ru')
        return this
      },

      update: function() {
        this.locale = localStorage.getItem('locale') || 'ru-ru'

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