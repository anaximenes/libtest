define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone) {
    var truncate = function(str, len) {
      if (str.length > len) {
        return str.substring(0, len - 1) + '&hellip;'
      } else return str
    }

    var convertBytes = function(bytes) {
      if(bytes == 0) return '0 Byte';
      var k = 1024;
      var sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }

    return {
      truncate:      truncate,
      convertBytes:  convertBytes
    }
  }
)