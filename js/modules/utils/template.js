define([
    'underscore'
    ], 
  function() {
    var compiled = {}

    var Manager = {
      get: function(template, callback) {
        if (!compiled[template]) {
          require(['text!/templates/' + template + '.html'], function(tmp) {
            compiled[template] = _.template(tmp)
            callback(compiled[template])
          })
        } else {
          callback(compiled[template])
        }
      }
    }

    return Manager
  }
)