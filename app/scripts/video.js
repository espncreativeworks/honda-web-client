/*global define */
define(['require', 'jquery', 'loglevel', 'google-analytics'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , ga = require('google-analytics')
    , analytics = {};

  analytics.trackPageView = function _trackPageView(url){
    ga('send', 'event', 'pageView', url);
  };

  analytics.trackAction = function _trackAction(type, description, label){
    ga('send', 'event', type, description, label);
    //console.log('tracking: ' + type + ' - ' + description + ' - ' + label);
  };

  analytics.initVideoTracking = function initVideoTracking($videos){
    var gaEventType = 'Video';
    $videos.each(function(){
      var $this = $(this);
      var video = $this.get(0);
      var videoSource = video.currentSrc;
      log.info(videoSource);
      video.milestoneInterval = null;
      video.milestones = {
        '0.25': false,
        '0.50': false,
        '0.75': false
      };
      var trackMilestones = function _trackMilestones(){
        var watched = video.currentTime / video.duration;
        if (watched >= 0.25 && watched < 0.50 && !video.milestones['0.25']){
          video.milestones['0.25'] = true;
          analytics.trackAction(gaEventType, '25% Watched', videoSource);
          return;
        }
        if (watched >= 0.50 && watched < 0.75 && !video.milestones['0.50']){
          video.milestones['0.50'] = true;
          analytics.trackAction(gaEventType, '50% Watched', videoSource);
          return;
        }
        if (watched >= 0.75 && watched < 1.00 && !video.milestones['0.75']){
          video.milestones['0.75'] = true;
          analytics.trackAction(gaEventType, '75% Watched', videoSource);
          return;
        }
      };

      $this.one('playing', function(){
        video.milestoneInterval = setInterval(trackMilestones, 100);
        analytics.trackAction(gaEventType, 'Started', videoSource);
        return;
      });

      $this.one('ended', function(){
        analytics.trackAction(gaEventType, 'Completed', videoSource);
        clearInterval(video.milestoneInterval);
        return;
      });

      $this.on('error abort emptied stalled', function(){
        clearInterval(video.milestoneInterval);
        return;
      });

    });
  };

  exports.init = function (){
    var $carousel, $videos;
    if ($('body').hasClass('home')){
      $carousel = $('#showcase-carousel');
      $videos = $carousel.find('video');
      analytics.initVideoTracking($videos);
      $carousel.on('slide.bs.carousel', function(){
        $videos.each(function(){
          var $video = $(this), video = $video.get(0);
          video.pause();
        });
      });

      $videos.each(function(){
        var $video = $(this), video = $video.get(0);
        $video.on('playing', function(){
          $carousel.carousel('pause');
          $videos.not(video).each(function(k,v){
            v.pause();
          });
        });
      });
    }
    log.info('video.js initialized');
  };

  return exports;
});
