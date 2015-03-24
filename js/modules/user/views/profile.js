define([
  'jquery',
  'underscore',
  'backbone',
  'modules/user/models/userdata',
  'text!templates/user/profile.html',
  // 'i18n!nls/profile'
  ], function($, _, Backbone, UserModel, Template) {//, i18n) {

    var ProfileView = Backbone.View.extend({
      render: function() {
        if (this.model.complete()) {
          this.$el.html(_.template(Template)(this.model.toJSON()))
        }
        return this
      },

      initialize: function (options) {
        this.model = new UserModel({ id: options.id })
        this.listenTo(this.model, 'change', this.render)
        this.model.fetch()
      }
    })

    return ProfileView
  }
)
