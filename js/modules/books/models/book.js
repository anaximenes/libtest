define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/url'
  ],
  function($, _, Backbone, Url) {
    var BookModel = Backbone.Model.extend({
      url: function() {
        return Url('book', this.id)
      },

      favorite: undefined,

      properties: [
        'id',
        'authors',
        'title',
        'isFavorite'
        // 'description'
      ],

      complete: function() {
        var that = this
        return this.properties.reduce(function(prev, cur) {
          return prev && (that.get(cur) != undefined)
        }, true)
      }
    })

    return BookModel
  }
)

     //   toggleFavorite: function() {
     //     this.set('favorite', !this.get('favorite'))
        // this.save(this.attrs, {patch: true})
        // // this.save()
     //   },
