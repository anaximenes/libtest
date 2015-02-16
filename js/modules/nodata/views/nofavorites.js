define([
    'jquery',
    'underscore',
    'backbone',
    'modules/static/views/view',
    'text!/templates/nofavorites.html',
    'i18n!modules/nls/nofavorites',
    'i18n!modules/nls/header'
  ],
  function($, _, Backbone, Static, Template, i18nA, i18nB) {
    var noFavorites = Static.extend({
      template: _.template(Template)(_.extend(i18nA, i18nB)),

      events: {
        'click .fa': 'click'
      },

      click: function() {
        this.$('.fa').toggleClass('fa-bookmark-o')
        this.$('.fa').toggleClass('fa-bookmark')
      }
    })

    return noFavorites
  }
)
