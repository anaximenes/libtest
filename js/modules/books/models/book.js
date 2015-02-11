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

      properties: [
        'id',
        'authors',
        'title',
        'isFavorite'
        // 'description'
      ],

      checkState: function() {
        var that = this
        $.ajax({
          type: 'HEAD',
          url: '//178.63.105.73/pdf/' + btoa(this.get('sourceUrl')),

          statusCode: {
            200: function(data, status, jqxhr) {
              console.log('yep, we have it!')
              that.set('size', jqxhr.getResponseHeader('Content-Length'))
              Backbone.trigger('book:reader:ok', that)
            }
          },

          error: function(data, status, jqxhr) {
            console.log('no book, folks(')
            that.set('size', undefined)
            Backbone.trigger('book:reader:error', that)
          }
        })
      },

      getReaderUrl: function() {
        if (!this.get('sourceUrl')) return ''
        else return '/reader/web/viewer.html?file=' + encodeURIComponent('http://178.63.105.73/pdf/' + btoa(this.get('sourceUrl')))
      },

      complete: function() {
        if (!this.properties) return true
        var that = this
        return this.properties.reduce(function(prev, cur) {
          return prev && (that.get(cur) != undefined)
        }, true)
      },

      present: function(options) {
        options || (options = {})
        var model = this.clone()

        if (options.short) {
          if (model.get('description')) {
            var text = model.get('description')
            if (text.length > 600) text = text.substring(0, 597) + '&hellip;'
            model.set('description', text)
          }
        }

        model.set('readerUrl', this.getReaderUrl())
        if (!this.get('authors')) {
          return model.toJSON()
        }

        model.unset('authors')
        var authors = this.get('authors').map(function(author) { return author.firstName })
        return _.extend(model.toJSON(), { authors: authors.join(', ') })
      }
    })

    return BookModel
  }
)
