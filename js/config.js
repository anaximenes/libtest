require.config({
  deps: ['main'],

  paths: {
    'jquery': "/vendor/jquery/dist/jquery",
    'underscore': "/vendor/lodash/lodash",
    'backbone': "/vendor/backbone/backbone",
    'markdown': '/vendor/pagedown/Markdown.Editor',
    'markdown-converter': '/vendor/pagedown/Markdown.Converter',
    'markdown-sanitizer': '/vendor/pagedown/Markdown.Sanitizer',
    'text': '/vendor/requirejs-text/text'
  },

  shim: {
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
