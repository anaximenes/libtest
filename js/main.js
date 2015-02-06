require([
    'backbone',
    'app',
    'modules/utils/scrolling',
    'text',
    'bootstrap'
  ], function(Backbone, App, Scrolling) {
    (function() {

      var proxiedSync = Backbone.sync;

      Backbone.sync = function(method, model, options) {
        options || (options = {});

          if (!options.crossDomain) {
            options.crossDomain = true;
          }

          if (!options.xhrFields) {
            options.xhrFields = {withCredentials: true};
          }

          return proxiedSync(method, model, options);
      };
    })();

    var user = new App.User.model();
    App.User.init(user)
    // var userview = new App.User.view({model: user});
    var Router = App.Router.extend({ user: user });
    var router = new Router();

    $(document).on("click", "a[href^='/']", function(event) {
      var href, passThrough, url;
      href = $(event.currentTarget).attr('href');
      passThrough = href.indexOf('reader') >= 0;
      if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault();
        url = href.replace(/^\//, '');
        router.navigate(url, {
          trigger: true
        });
        return false;
      }
    });

    $(function() {
      if (window.location.hash.indexOf('!') > -1) {
        return window.location = window.location.hash.substring(2);
      }
    });

    Backbone.history.start({ pushState: true });
    Scrolling.initialize();
  }
)
