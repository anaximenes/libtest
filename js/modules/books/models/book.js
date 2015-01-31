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
      },

      present: function() {
        if (!this.get('authors')) {
          return this.toJSON()
        }

        var templateModel = this.clone()
        templateModel.unset('authors')
        var authors = this.get('authors').map(function(author) { return author.firstName })
        return _.extend(templateModel.toJSON(), {authors: authors.join(', ')})
      }
    })

    return BookModel
  }
)
