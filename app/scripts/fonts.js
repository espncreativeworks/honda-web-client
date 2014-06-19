/*global define, WebFont */
define(['require', 'loglevel', 'webfontloader'], function (require){
  'use strict';

  var exports = {}
    , config = {}
    , log = require('loglevel');

  require('webfontloader');

  config.typekit = {
    id: 'mbk6ssi'
  };

  exports.init = function(){
    WebFont.load(config);
    log.info('fonts.js initialized');
  };

  return exports;
});
