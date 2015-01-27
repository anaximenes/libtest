define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone) {
    var Scrolling = {};

    var $el = $(window)

    var tolerance = 800

    _.extend(Scrolling, Backbone.Events)

    Scrolling.trackScrolling = function() {
      $el.on('scroll', _.throttle(
        function(event) {
          var body = document.body;
          var threshold = body.scrollHeight - window.innerHeight - tolerance;
          if (body.scrollTop > threshold) {
            Backbone.trigger('page:scrollbottom');
          }
        }, 500)
      );
    }

    Scrolling.trackScrollTo = function() {
      this.listenTo(Backbone, 'page:scrollto', function(offset) {
        document.body.scrollTop = offset;
      });
    }

    // Run this module by calling initialize().
    Scrolling.initialize = function() {
      this.trackScrolling();
      this.trackScrollTo();
    }   
    
    return Scrolling
  }
)
