'use strict';
var _ = require('underscore');

(function() {
  var EEELib = (function() {
    var EEELib = {
      burp: function(){
        console.log('BURPING');
      },
      
      fail: function fail(thing){
        throw new Error(thing);
      },

      isIndexed: function isIndexed(data){
        return _.isArray(data) || _.isString(data);
      },

      note: function note(thing){
        console.log(['NOTE', thing].join(' '));
      },
      
      warn: function warn(thing){
        console.log(['WARNING', thing].join(' '));
      }
    };

    return EEELib;
  })();

  /* global define */
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = EEELib;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return EEELib;
      });
    } else {
      window.EEELib = EEELib;
    }
  }
})();