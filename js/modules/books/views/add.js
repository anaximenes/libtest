define([
    'jquery',
    'underscore',
    'backbone',
    'modules/utils/main',
    'text!/templates/books/books-add.html',
    'i18n!modules/nls/addbook',
    'i18n!modules/nls/page-books-card',
    'bootstrap'
  ],
  function($, _, Backbone, Utils, Template, i18nAddBook, i18nBookCard) {
    var AddView = Backbone.View.extend({
      events: {
        'change .input-file': 'onFileAdded',
        'change .input-title': 'checkTitle',
        'input .input-title': 'checkTitleDeBounced',
        'click .button-upload': 'submit',
        'submit': 'submit'
      },

      validateFile: function(file) {
        if (file.size > 50000000) {
          this.$('.file-size-caption').html(i18nAddBook.label_file_size_exceeded)
          return false;
        } else {
          this.$('.file-size-caption').html(Utils.Tools.convertBytes(file.size))
          return true;
        }
      },

      onFileAdded: function() {
        var $input = this.$('.input-file');
        var files = $input.get(0).files;
        if (!files || files.length === 0) {
          this.$('.input-file-text').html(i18nAddBook.label_choose_file);
          this.$('.book-info').slideUp('fast');
          return;
        }
        var label = $input.val().replace(/\\/g, '/').replace(/.*\//, '');
        this.$('.input-file-text').html(label);

        if (this.validateFile(files[0])) {
          this.$('.book-info').slideDown('fast');
        }
      },

      checkTitle: function() {
        if (this.$('.input-title').val().trim()) {
          this.$('.error-title').slideUp('fast');
          var title = this.$('.input-title').val();
          this.$('.duplicate-search').html('"' + title + '"');
          this.$('.duplicate-search').attr('href', '/books/search/' + title)
          this.$('.duplicate-block').slideDown('fast');
        } else {
          this.$('.duplicate-block').slideUp('fast');
        }
      },

      validate: function(title) {
        if (!title) {
          this.$('.error-title').slideDown('fast');
          return false
        } else {
          return true
        }
      },

      submit: function() {
        var title = this.$('.input-title').val().trim();
        var authors = this.$('.input-authors').val().trim();
        var publisher = this.$('.input-publisher').val().trim();
        var year = this.$('.input-year').val().trim();
        var isbn = this.$('.input-isbn').val().trim();
        var isbnType = this.$('.input-isbn-type').val();

        if (!this.validate(title)) return;

        var model = new Backbone.Model({
          date: (new Date()).getTime(),
          title: title,
          authors: authors,
          year: year,
          tags: [],
          isbn13: (isbnType === 'isbn13' ? isbn : null),
          isbn10: (isbnType === 'isbn13' ? null : isbn),
          // id: 1241360
        })
        model.save({
          success: function() {
            this.$('.book-info').slideUp('fast');
            Backbone.trigger('openBook', model.id);
          }.bind(this),
          error: function() {
            console.log('could not add book');
          }.bind(this)
        });
        console.log(model);
      },

      render: function() {
        this.$el.html(_.template(Template)(_.extend(i18nAddBook, i18nBookCard)));
        return this;
      },

      initialize: function(options) {
        this.checkTitleDeBounced = _.debounce(this.checkTitle, 750);
      }
    })

    return AddView;
  }
)
