define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url',
  ],
  function($, _, Backbone, Url, AuthModel, SignupModel) {
    var UserModel = Backbone.Model.extend({
      url: function() {
        return Url('user', this.id)
      },

      defaults: {
        education: {name: ''},
        address: '',
        profession: ''
      },

      properties: [
        'id',
        'fullname',
        'nickname',
      ],

      complete: function() {
        var that = this
        return this.properties.reduce(function(prev, cur) {
          return prev && (that.get(cur) != undefined)
        }, true)
      },

      initialize: function() {
      }
    })

    return UserModel
  }
)
