define([
    'underscore',
    'text!/templates/signin.html',
    'text!/templates/signup.html',
    'modules/templates'
    ], 
  function(_, a, b, Templates) {
    var compiled = {}

    var Manager = {
      get: function(template) {
        if (!compiled[template]) {
          compiled[template] = _.template(Templates[template])
        }
        return compiled[template]
      }
    }

    return Manager
  }
)