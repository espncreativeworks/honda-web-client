/*global define */
define(['require', 'jquery', 'loglevel', 'fastclick', './menu', './carousel', './confirm', './members', './upload', './social', './legal', './utils/floodlight'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , FastClick = require('fastclick')
    , menu = require('menu')
    , carousel = require('carousel')
    , confirm = require('confirm')
    , members = require('members')
    , upload = require('upload')
    , social = require('social')
    , legal = require('legal')
    , floodlight = require('utils/floodlight');

  exports.init = function(){
    FastClick.attach(document.body);
    members.init();
    menu.init();
    carousel.init();
    confirm.init();
    upload.init();
    social.init();
    legal.init();
    floodlight.init();
    log.info('running jQuery v' + $.fn.jquery);
    log.info('app.js initialized');
  };

  return exports;
});
