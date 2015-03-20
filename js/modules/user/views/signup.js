define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/user/signup.html',
    'i18n!nls/sign'
  ],
  function($, _, Backbone, Template, i18n) {
    SignUpView = Backbone.View.extend({
      events: {
        'submit': 'signup',
      },

      validate: function(name, email, pass1, pass2) {
        var ok = true
        this.$('.error-signup').hide()
        if (name === '') {
          ok = false
          this.$('.form-name').addClass('has-error')
        } else {
          this.$('.form-name').removeClass('has-error')
        }
        if (email === '') {
          ok = false
          this.$('.form-email').addClass('has-error')
        } else {
          this.$('.form-email').removeClass('has-error')
        }
        if (pass1 != pass2) {
          ok = false
          this.$('.form-password').addClass('has-error')
          this.$('.error-password-match').show()
        } else {
          this.$('.form-password').removeClass('has-error')
          this.$('.error-password-match').hide()
        }
        return ok
      },

      signup: function(event) {
        event.preventDefault()
        var password = this.$el.find('#inputPassword').val()
        var password2 = this.$el.find('#inputPasswordRepeat').val()
        var email = this.$el.find('#inputEmail').val().trim()
        var name = this.$el.find('#inputName').val().trim()

        if (!this.validate(name, email, password, password2)) return

        Backbone.trigger('user:signup', {
          email: this.$el.find('#inputEmail').val(),
          password: this.$el.find('#inputPassword').val(),
          verifyPassword: this.$el.find('#inputPassword').val(),
          name: this.$el.find('#inputName').val()
        })
      },

      error: function() {
        this.$('.error-signup').show()
      },

      render: function() {
        var that = this
        this.$el.html(_.template(Template)(i18n))
        return this
      },

      initialize: function() {
        this.listenTo(Backbone, 'user:signup:error', this.error)
      }
    })

    return SignUpView
  }
)
