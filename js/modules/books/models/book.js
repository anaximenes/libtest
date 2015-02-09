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

      getReaderUrl: function() {
        if (!this.get('sourceUrl')) return ''
        else return '/reader/web/viewer.html?file=' + encodeURIComponent('http://178.63.105.73/pdf/' + btoa(this.get('sourceUrl')))
      },

      complete: function() {
        var that = this
        return this.properties.reduce(function(prev, cur) {
          return prev && (that.get(cur) != undefined)
        }, true)
      },

      presentShort: function() {
        var model = this.clone()
        if (model.get('description')) {
          var text = model.get('description')
          if (text.length > 600) text = text.substring(0, 597) + '&hellip;'
          model.set('description', text)
        }
        model.set('readerUrl', this.getReaderUrl())
        if (!this.get('authors')) {
          return model.toJSON()
        }

        // var templateModel = this.clone()
        model.unset('authors')
        var authors = this.get('authors').map(function(author) { return author.firstName })
        return _.extend(model.toJSON(), {authors: authors.join(', ')})
      },

      present: function() {
        var model = this.clone()
        model.set('readerUrl', this.getReaderUrl())
        if (!this.get('authors')) {
          return model.toJSON()
        }

        // var templateModel = this.clone()
        model.unset('authors')
        var authors = this.get('authors').map(function(author) { return author.firstName })
        return _.extend(model.toJSON(), {authors: authors.join(', ')})
      }
    })

    return BookModel
  }
)
