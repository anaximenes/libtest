var locale = localStorage.getItem('locale') || 'ru';

require.config({
  deps: ['main'],

  paths: {
    'jquery': "/vendor/jquery/dist/jquery",
    'bootstrap': "/vendor/bootstrap/dist/js/bootstrap",
    'underscore': "/vendor/lodash/lodash",
    'backbone': "/vendor/backbone/backbone",
    'markdown': '/vendor/pagedown/Markdown.Editor',
    'markdown-converter': '/vendor/pagedown/Markdown.Converter',
    'markdown-sanitizer': '/vendor/pagedown/Markdown.Sanitizer',
    'text': '/vendor/requirejs-text/text',
    'i18n': '/vendor/requirejs-i18n/i18n',
  },

  config: {
    i18n: {
      locale: locale
    }
  },

  shim: {
    'bootstrap': {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    'markdown': {
      deps: ['markdown-sanitizer'],
      exports: "Markdown"
    },
    'markdown-sanitizer': {
      deps: ['markdown-converter'],
      exports: "Markdown"
    }
  }
});
