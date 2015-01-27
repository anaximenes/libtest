require.config({
  deps: ['main'],

  paths: {
    jquery: "libs/jquery.min",
    underscore: "libs/underscore.min",
    backbone: "libs/backbone.min",
    // backbone: "libs/backbone",
    // bootstrap: ".libs/bootstrap",
    'markdown-converter': 'libs/pagedown/Markdown.Converter',
    'markdown-editor': 'libs/pagedown/Markdown.Editor',
    'markdown-sanitizer': 'libs/pagedown/Markdown.Sanitizer',
    'markdown': 'libs/pagedown/markdown'    
  },

  shim: {
    'markdown-editor': {
      deps: ['markdown-converter']
    },
    'markdown-sanitizer': {
      deps: ['markdown-converter']
    }
  }
});
