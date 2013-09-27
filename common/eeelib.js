'use strict';
/* global define */

(function() {
  var EEELib = (function() {
    var EEELib = {
      burp: function(){
        console.log('BURPING');
      }
    };

    return EEELib;
  })();

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