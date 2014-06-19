/*global define */
define(['require', 'jquery', 'loglevel', 'uri/URI', 'facebook'], function (require){
  'use strict';

  var exports = {}
    , social = { fb: {}, twttr: {} }
    , $ = require('jquery')
    , log = require('loglevel')
    , URI = require('uri/URI')
    , FB
    , getTweetUrl = function(options){
      var shareBaseUrl, settings, url;
      shareBaseUrl = 'https://twitter.com/share';
      settings = $.extend({}, social.twttr.params, options || {});
      url = new URI(shareBaseUrl).addQuery(settings);
      log.info(url);
      return url.toString();
    };

  social.fb.appId = '776266909080092';

  social.fb.params = {
    method: 'feed',
    name: 'Honda Perfect Play',
    link: 'http://espn.com/hondaperfectplay',
    picture: 'http://a.espncdn.com/contests/honda/2014/perfectplay/display/100x100.jpg',
    caption: 'http://espn.com/hondaperfectplay',
    description: 'Enter for a chance to win a 2014 Honda Odyssey and a trip to the Little League Baseball World Series.'
  };

  social.fb.callback = function _fb_callback(response){
    if (response && response.post_id){
      // track post
      //console.log(response);
    } else {
      // track abandoned post
      //console.warn('abandoned post');
    }
  };

  social.twttr.params = {
    url: 'http://espn.com/hondaperfectplay',
    related: 'honda,littleleague,espn,espnpromotions',
    text: 'Enter for a chance to win a Honda Odyssey! No purchase necessary.',
    counturl: 'http://promo.espn.go.com/espn/contests/honda/2014/perfectplay/'
  };

  window.fbAsyncInit = function _fbAsyncInit(){
    FB.init({
      appId: social.fb.appId,
      status: true,
      xfbml: true
    });
  };

  FB = require('facebook');

  exports.init = function(){
    
    $('[data-control-action="share-facebook"]').on('click', function (){
      var params = {}, $this = $(this), subject = $this.attr('data-share-subject') || 'promo';
      if (subject === 'video' || subject === 'sweeps'){
        params.description = $this.attr('data-share-message');
        params.link = $this.attr('data-share-url');
        params.caption = params.link;
        params = $.extend({}, social.fb.params, params);
        FB.ui(params, social.fb.callback);
      } else {
        FB.ui(social.fb.params, social.fb.callback);
      }
    });

    $('[data-control-action="share-twitter"]').on('click', function (){
      var params = {}, $this = $(this), subject = $this.attr('data-share-subject') || 'promo';
      if (subject === 'video' || subject === 'sweeps'){
        params.text = $this.attr('data-share-message');
        params.url = $this.attr('data-share-url');
        params.counturl = params.url;
        window.open(getTweetUrl(params), '_blank');
      } else {
        window.open(getTweetUrl(), '_blank');
      }
    });

    log.info('social.js initialized');
  };

  return exports;
});
