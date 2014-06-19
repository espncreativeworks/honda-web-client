/*global define */
define(['require', 'jquery', 'loglevel'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel');

  exports.init = function(){
    $('#menu-toggle, .menu-close').on('click', function(){
      $('#menu-toggle').toggleClass('active');
      $('body').toggleClass('body-push-to-left');
      $('#flyout-menu').toggleClass('menu-open');
    });

    log.info('menu.js initialized');
  };

  return exports;
});
