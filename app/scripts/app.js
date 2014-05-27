/*global define */
define(['require', 'jquery', 'loglevel', 'fastclick', './menu', './carousel', './upload', './legal'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , FastClick = require('fastclick')
    , menu = require('menu')
    , carousel = require('carousel')
    , upload = require('upload')
    , legal = require('legal');

  exports.init = function(){
    FastClick.attach(document.body);
    menu.init();
    carousel.init();
    upload.init();
    legal.init();
    log.info('running app.js');
  };

  return exports;
});
