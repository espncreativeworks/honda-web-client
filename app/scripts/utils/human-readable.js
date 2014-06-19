/*global define */
define(['require', 'loglevel'], function (require){
  'use strict';

  var exports = {}
    , log = require('loglevel');

  exports.fromBytes = function (sizeInBytes){
    var i, byteUnits;

    i = -1;
    byteUnits = [ ' kb', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB' ];

    do {
      sizeInBytes = sizeInBytes / 1024;
      i++;
    } while (sizeInBytes > 1024);

    return Math.max(sizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };

  return exports;

});
