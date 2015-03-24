require.config({
  deps: ['main'],
  paths: {
    'templates': '../templates',
    'nls': '../js/modules/nls',

    'jquery': "/vendor/jquery/dist/jquery",
    'bootstrap': "/vendor/bootstrap/dist/js/bootstrap",
    'underscore': "/vendor/lodash/lodash",
    'backbone': "/vendor/backbone/backbone",
    'markdown': '/vendor/pagedown/Markdown.Editor',
    'markdown-converter': '/vendor/pagedown/Markdown.Converter',
    'markdown-sanitizer': '/vendor/pagedown/Markdown.Sanitizer',
    'selectize': '/vendor/selectize/dist/js/standalone/selectize',
    'text': '/vendor/requirejs-text/text',
    'i18n': '/vendor/requirejs-i18n/i18n',
  },

  config: {
    i18n: {
      locale: 'ru'
    }
  },

  shim: {
    'bootstrap': {
      deps: ['jquery']
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
