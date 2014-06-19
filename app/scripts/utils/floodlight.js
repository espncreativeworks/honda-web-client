/*global define */
define(['require', 'jquery', 'loglevel', 'uri/URI'], function (require){
  'use strict';

  var exports = {}
    , $ = require('jquery')
    , log = require('loglevel')
    , URI = require('uri/URI')
    , Floodlight = function(cat){
      if (!cat){
        throw Error('A "cat" parameter is required.');
      }
      if (!(this instanceof Floodlight)){
        return new Floodlight(cat);
      }
      var ord = Math.floor(Math.random() * 10e12);
      this.base = 'http://4114413.fls.doubleclick.net/activityi;';
      this.params = {
        src: '4114413',
        type: 'espnz878',
        cat: cat || '',
        ord: ord
      };
      return this;
    };

  Floodlight.prototype.track = function ($target){
    var attrs, _src, $el;
    _src = this.base + URI.buildQuery(this.params).replace(/\&/gi,';');
    attrs = {
      style: 'display:none;',
      width: 1,
      height: 1,
      frameborder: 0,
      src: _src
    };
    if ($target){
      $el = $('<iframe>', attrs);
      $target.append($el);
    } else {
      return _src;
    }
  };

  Floodlight.prototype.toString = function(){
    return '[object Floodlight ' + this.track() + ']';
  };

  exports.init = function(){

    $(document).on('floodlight.track', function(e){
      var $target = $(e.target), cat, fl;
      if ($target.attr('data-floodlight-cat')){
        cat = $target.attr('data-floodlight-cat');
        log.info(cat);
        fl = new Floodlight(cat);
        log.info(fl);
        fl.track($('#scratchpad'));
      }
    });

    var selectors = [
      '[data-control-action="begin-video"]',
      '[data-control-action="enter-sweepstakes"]',
      '[data-control-action="update-address"]',
      '[data-control-action="confirm"]',
      '[data-control-action="select-video-file"]',
      '[data-control-action="submit-video"]'
    ];

    $(selectors.join(', ')).on('click', function (e){
      var $target = $(e.target), evt;
      if ($target.attr('data-floodlight-cat')){
        evt = $.extend(true, {}, e, { type: 'floodlight.track' });
        log.info(evt);
        $(document).trigger(evt);
      }
    });

    log.info('floodlight.js initialized');
  };

  return exports;
});
