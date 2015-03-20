define([
    'jquery',
    'underscore',
    'backbone',
    'modules/static/views/view',
    'text!templates/norecent.html',
    'i18n!nls/norecent',
    'i18n!nls/header'
  ],
  function($, _, Backbone, Static, Template, i18nA, i18nB) {
    var noRecent = Static.extend({
      template: _.template(Template)(_.extend(i18nA, i18nB)),
    })

    return noRecent
  }
)
