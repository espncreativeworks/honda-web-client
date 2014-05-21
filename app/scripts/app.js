/*global define */
define(['require', 'jquery', 'loglevel', 'fastclick', './menu'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , FastClick = require('fastclick')
    , menu = require('menu');

  exports.init = function(){
    FastClick.attach(document.body);
    menu.init();
    log.info('running app.js');
  };

  return exports;
});
