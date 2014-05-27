/*global define */
define(['require', 'jquery', 'loglevel', 'hammer'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , Hammer = require('hammer')
    , opts = {
      hammer: {
        //preventDefault: true,
        gestures: true
      },
      carousel: {
        interval: 4000,
        pause: 'click',
        wrap: true
      }
    };

  exports.init = function(){
    var $carousel, hammertime;
    if ($('#showcase-carousel').length){
      $carousel = $('#showcase-carousel').carousel(opts.carousel);
      hammertime = new Hammer($carousel.get(0), opts.hammer);
      hammertime.on('swipeleft', function(){
        log.info('handled swipeleft');
        $carousel.carousel('next');
      });
      hammertime.on('swiperight', function(){
        log.info('handled swiperight');
        $carousel.carousel('prev');
      });
    }
    log.info('running carousel.js');
  };

  return exports;
});
