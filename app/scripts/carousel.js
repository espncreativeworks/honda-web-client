/*global define */
define(['require', 'jquery', 'loglevel', 'hammer', 'video'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , Hammer = require('hammer')
    , video = require('video')
    , opts = {
      hammer: {
        //preventDefault: true,
        gestures: true
      },
      carousel: {
        interval: 4000,
        pause: 'hover',
        wrap: true
      }
    };

  exports.init = function(){
    var $carousel, hammertime;
    if ($('#showcase-carousel').length){
      $carousel = $('#showcase-carousel').carousel(opts.carousel);
      $carousel.carousel('pause');
      hammertime = new Hammer($carousel.get(0), opts.hammer);
      hammertime.on('swipeleft', function(){
        log.info('handled swipeleft');
        $carousel.carousel('next');
      });
      hammertime.on('swiperight', function(){
        log.info('handled swiperight');
        $carousel.carousel('prev');
      });
      video.init();
    }
    log.info('carousel.js initialized');
  };

  return exports;
});
