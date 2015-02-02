define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone) {
    var Scrolling = {};

    var $el = $(window)

    var tolerance = 1200

    _.extend(Scrolling, Backbone.Events)

    Scrolling.trackScrolling = function() {
      $el.on('scroll', _.throttle(
        function(event) {
          if($(document).scrollTop() + $(window).height() + tolerance >= $(document).height()) {
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
